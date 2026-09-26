'use client';

/*
 * SectionFoldReveal — scroll-triggered gate-fold for in-page sections
 *
 * Same visual language as HomeFoldIntro: two panels (top + bottom) hinge
 * at the section's vertical center (the crease), rotating open via rotateX
 * when the section scrolls into view.
 *
 * Key differences from HomeFoldIntro:
 *   - Panels cover only the section's own height (not full viewport)
 *   - Triggered by ScrollTrigger scroll entry, not page load
 *   - Duration is shorter (0.55s vs 0.75s) — subtler, not a brand moment
 *   - Plays once per scroll-into-view (replays on return navigation)
 *
 * Props:
 *   children       — the section content to reveal
 *   gateWithIntro  — (Hero only) skip the fold if the homepage intro is
 *                    about to play in the same page load, preventing two
 *                    consecutive fold animations. Uses the intro's session-
 *                    Storage key as a read-only signal: if the key is absent
 *                    the intro will play → skip; if the key exists → run.
 *
 * prefers-reduced-motion: panels never render, content immediately visible.
 * Mobile (≤ 768px): 2D translateY + opacity, no 3D rotateX.
 */

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './SectionFoldReveal.module.css';

/*
 * The same key HomeFoldIntro uses. Read-only here — SectionFoldReveal
 * never writes to sessionStorage. It only reads whether the intro has
 * already played (key present) or is about to play (key absent).
 */
const INTRO_SESSION_KEY = 'twofold_intro_seen';

export default function SectionFoldReveal({ children, gateWithIntro = false }) {
  // SSR-safe: server always renders without panels.
  // Prevents hydration mismatch and avoids a flash of panel on first paint.
  const [mounted, setMounted] = useState(false);
  // true once the animation finishes; removes panels from the DOM entirely.
  const [done, setDone]       = useState(false);

  const wrapperRef = useRef(null);
  const topRef     = useRef(null);
  const bottomRef  = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  // ── ScrollTrigger fold animation ──────────────────────────────────────
  useGSAP(() => {
    if (!mounted) return;
    if (!wrapperRef.current || !topRef.current || !bottomRef.current) return;

    // CSS also hides panels, but bail in JS too so no timeline is created.
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDone(true);
      return;
    }

    /*
     * Hero gate: if the sessionStorage key is absent, HomeFoldIntro will
     * play this page load. Skip the Hero fold to prevent back-to-back
     * fold animations firing simultaneously.
     *
     * Logic (inverted from HomeFoldIntro's own check):
     *   key absent  → intro WILL play this load → skip Hero fold
     *   key present → intro already ran this session → run Hero fold
     *
     * This uses sessionStorage as a READ-ONLY signal, not to control
     * whether SectionFoldReveal replays. On every return navigation to "/",
     * the key is present (intro won't replay) so the Hero fold runs again.
     */
    if (gateWithIntro) {
      try {
        const introAlreadyRan = sessionStorage.getItem(INTRO_SESSION_KEY);
        if (!introAlreadyRan) {
          // Intro is about to cover the screen — no need for Hero's fold.
          setDone(true);
          return;
        }
      } catch {
        // sessionStorage blocked — skip fold as a safe default.
        setDone(true);
        return;
      }
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const top      = topRef.current;
    const bottom   = bottomRef.current;

    const handleComplete = () => {
      gsap.set([top, bottom], { clearProps: 'willChange,transform' });
      setDone(true);
    };

    // ── Timeline (paused — ScrollTrigger drives play) ──
    gsap.set([top, bottom], { willChange: 'transform' });

    const tl = gsap.timeline({ paused: true, onComplete: handleComplete });

    if (isMobile) {
      /*
       * 2D mobile variant: panels translate out (top up, bottom down)
       * with an opacity crossfade. No rotateX — avoids GPU pressure and
       * perspective-origin issues in mobile browser chrome.
       *
       * translateY(-100%) = -100% of the panel's own height = -50% of
       * the section height. Panel moves fully off-screen upward. Same
       * math applies in the downward direction for the bottom panel.
       */
      tl.to(top,    { y: '-100%', opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 0)
        .to(bottom, { y:  '100%', opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 0);
    } else {
      /*
       * Desktop 3D gate-fold (same axis/direction logic as HomeFoldIntro):
       *
       * Top panel     transform-origin: center bottom  (hinge = crease)
       *   rotateX(-92deg) → top edge swings backward into screen
       *
       * Bottom panel  transform-origin: center top     (hinge = crease)
       *   rotateX(92deg)  → bottom edge swings backward into screen
       *
       * 92° (vs 90°) ensures the panel fully clears edge-on so
       * backface-visibility:hidden hides it cleanly without flickering.
       * Duration 0.55s — subtler than the intro's 0.75s since these are
       * in-page transitions, not full brand moments.
       */
      tl.to(top,    { rotateX: -92, duration: 0.55, ease: 'power2.inOut' }, 0)
        .to(bottom, { rotateX:  92, duration: 0.55, ease: 'power2.inOut' }, 0);
    }

    // ── ScrollTrigger: plays the fold when section enters the viewport ──
    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      /*
       * start: 'top 80%'
       * Fires when the section's top edge reaches 80% down from the
       * viewport's top. Gives the user a moment to see the fold start
       * as the section scrolls into view — not too early, not too late.
       */
      start: 'top 80%',
      /*
       * once: true — ScrollTrigger kills itself after firing.
       * The timeline handles the "play once" behaviour; we don't need
       * toggleActions since the trigger self-destructs.
       */
      once: true,
      onEnter: () => { tl.play(); },
    });

    return () => {
      tl.kill();
      st.kill();
    };
  }, { scope: wrapperRef, dependencies: [mounted] });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {/* Section content renders normally beneath the panels */}
      {children}

      {/*
       * Panels are only rendered client-side after mount (SSR-safe).
       * Removed from DOM entirely once animation completes (done=true).
       * aria-hidden: never reachable by keyboard or screen readers.
       */}
      {mounted && !done && (
        <div className={styles.perspectiveBox} aria-hidden="true">
          {/* Top panel — hinge: center bottom (= section's vertical center = crease) */}
          <div ref={topRef} className={styles.panelTop} />
          {/* 1px crease line: flat in screen space, not transformed with panels */}
          <div className={styles.creaseLine} />
          {/* Bottom panel — hinge: center top (= section's vertical center = crease) */}
          <div ref={bottomRef} className={styles.panelBottom} />
        </div>
      )}
    </div>
  );
}
