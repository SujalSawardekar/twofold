'use client';

/*
 * HomeFoldIntro — homepage gate-fold opening sequence
 *
 * Design: Two full-width panels (top + bottom) cover the hero on
 * first load, hinged at the screen's vertical center (the "crease").
 * A GSAP timeline rotates them open simultaneously — top swings up,
 * bottom swings down — revealing the hero that has been mounting
 * and running its own entrance animation silently underneath.
 *
 * Animation library: GSAP 3 (already a project dependency via @gsap/react).
 * No new dependencies added.
 *
 * Hero race decision (deliberate): Hero's own GSAP entrance starts at
 * delay: 0.15 and completes in ~870ms. The fold intro holds for 200ms
 * then opens over 750ms (total ~950ms). By the time panels clear the
 * hero is fully stable — we do NOT tween the hero from this component
 * to avoid conflicting with its own animations.
 *
 * Session behaviour: plays once per browser session (sessionStorage).
 * Replays on a new tab / fresh session. Does NOT replay on internal
 * client-side navigation back to "/" — the flag persists for the
 * tab's lifetime.
 */

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './HomeFoldIntro.module.css';

const SESSION_KEY = 'twofold_intro_seen';

export default function HomeFoldIntro() {
  // SSR-safe: start false, set true only after client mount check.
  // Prevents hydration mismatch — server always renders nothing.
  const [shouldRender, setShouldRender] = useState(false);
  // true once animation completes; component renders null afterward.
  const [done, setDone] = useState(false);

  const overlayRef = useRef(null);
  const topRef     = useRef(null);
  const bottomRef  = useRef(null);

  // ── Mount guard: SSR-safe sessionStorage + reduced-motion check ──
  useEffect(() => {
    // CSS also hides the overlay under prefers-reduced-motion,
    // but we bail out in JS too so no DOM or timers are created at all.
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Only play once per session.
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // sessionStorage blocked (private-browsing iframe etc.) — skip intro.
      return;
    }

    // Lock body scroll for the duration of the intro.
    // Matches the same pattern used by Navbar's mobile drawer.
    document.body.style.overflow = 'hidden';

    setShouldRender(true);
  }, []);

  // ── GSAP animation (fires when shouldRender flips true) ──
  useGSAP(() => {
    if (!shouldRender) return;
    if (!overlayRef.current || !topRef.current || !bottomRef.current) return;

    const top    = topRef.current;
    const bottom = bottomRef.current;

    // Re-check in case viewport resized between mount and effect.
    const isMobile =
      window.matchMedia('(max-width: 768px)').matches;

    // ── Cleanup / teardown ────────────────────────────────────────
    const handleComplete = () => {
      // 1. Persist session flag so the intro doesn't replay this session.
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* noop */ }

      // 2. Remove will-change hints set during animation.
      gsap.set([top, bottom], { clearProps: 'willChange,transform' });

      // 3. Restore body scroll. window.lenis may not be set if
      //    SmoothScrollProvider's effect runs after ours; guard defensively.
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }

      // 4. Mark done → component renders null → overlay removed from DOM.
      setDone(true);
    };

    // Hint the GPU for the panels that are about to transform.
    gsap.set([top, bottom], { willChange: 'transform' });

    // Pause Lenis smooth scroll during the intro so the underlying
    // page doesn't scroll while the panels are covering it.
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.stop();
    }

    // ── Timeline ──────────────────────────────────────────────────
    const tl = gsap.timeline({
      delay: 0.2,         // brief hold: let the crease + labels register
      onComplete: handleComplete,
    });

    if (isMobile) {
      /*
       * Mobile 2D variant: no rotateX — just translate + fade.
       * Top panel slides upward off-screen, bottom slides downward.
       * Cheaper on low-powered GPUs; avoids safe-area / chrome issues.
       */
      tl.to(top,    { y: '-100%', opacity: 0, duration: 0.65, ease: 'power2.inOut' }, 0)
        .to(bottom, { y:  '100%', opacity: 0, duration: 0.65, ease: 'power2.inOut' }, 0);
    } else {
      /*
       * Desktop 3D gate-fold:
       *
       * Top panel    transform-origin: center bottom  (hinge = crease)
       *   rotateX(-92deg) → top edge swings backward into the screen,
       *   disappears cleanly past 90° via backface-visibility: hidden.
       *
       * Bottom panel transform-origin: center top    (hinge = crease)
       *   rotateX(92deg)  → bottom edge swings backward into the screen,
       *   disappears cleanly past 90°.
       *
       * Both panels open simultaneously and symmetrically around the
       * shared crease, which stays visually fixed at screen center.
       *
       * Easing: power2.inOut — mechanical, no overshoot/bounce.
       * 92° (not exactly 90°) guarantees the panel clears past edge-on
       * so backface-visibility:hidden fully hides it without flickering.
       */
      tl.to(top,    { rotateX: -92, duration: 0.75, ease: 'power2.inOut' }, 0)
        .to(bottom, { rotateX:  92, duration: 0.75, ease: 'power2.inOut' }, 0);
    }

    return () => { tl.kill(); };
  }, { scope: overlayRef, dependencies: [shouldRender] });

  // Component is either not-yet-ready (SSR / first render) or finished.
  // In both cases render nothing — no DOM node, no pointer events.
  if (!shouldRender || done) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      aria-hidden="true"    /* never reachable by keyboard or screen reader */
      role="presentation"
    >
      {/*
       * Top panel — covers upper half of viewport.
       * Hinge: center bottom (= crease). Opens by rotating up + back.
       */}
      <div ref={topRef} className={styles.panelTop}>
        {/* Ghost brand wordmark near the crease edge — mirrors FoldExperience ghostNumeral */}
        <span className={styles.ghostBrand} aria-hidden="true">TWOFOLD</span>
        {/* Micro crease label near bottom-right of top panel */}
        <span className={styles.creaseLabel} aria-hidden="true">
          FOLD CREASE · 0.15mm TOLERANCE
        </span>
      </div>

      {/*
       * 1px crease line — lives at the overlay level (not inside a panel)
       * so it has no 3D transform and stays flat throughout the animation.
       */}
      <div className={styles.creaseLine} aria-hidden="true" />

      {/*
       * Bottom panel — covers lower half of viewport.
       * Hinge: center top (= crease). Opens by rotating down + back.
       */}
      <div ref={bottomRef} className={styles.panelBottom}>
        {/* EST label near the crease edge of the bottom panel */}
        <span className={styles.estLabel} aria-hidden="true">
          TWOFOLD — EST. 1988
        </span>
      </div>
    </div>
  );
}
