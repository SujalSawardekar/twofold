'use client';

import { useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { playBottomLand } from '@/lib/audio';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const foldLineRef = useRef(null);
  const headlineRef = useRef(null);
  const subContentRef = useRef(null);
  const triggeredRef = useRef(false);

  // Audio trigger on viewport intersection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggeredRef.current) {
            triggeredRef.current = true;
            playBottomLand();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // GSAP Progressive Reveal Animation
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // SVG paper fold line stroke animation
    if (foldLineRef.current) {
      const length = foldLineRef.current.getTotalLength();
      gsap.set(foldLineRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(foldLineRef.current, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }

    // Headline upward reveal
    gsap.from(headlineRef.current, {
      y: 45,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    });

    // Sub-content & CTA stagger reveal
    gsap.from(subContentRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      delay: 0.25,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
        once: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef} id="final-cta" data-theme="dark">
      <div className={styles.inner}>

        {/* ── TOP METADATA BAR WITH REGISTRATION MARKS ── */}
        <div className={styles.metaRow}>
          <div className={styles.registrationMark}>
            <span className={styles.crosshair}>+</span>
            <span className={styles.metaText}>PALGHAR ORIGIN · JNPT EXPORT READY · AQL 2.5</span>
          </div>
          <span className={styles.conclusionTag}>MANUFACTURING CONCLUSION</span>
        </div>

        {/* ── GIANT EDITORIAL ASYMMETRIC HEADLINE ── */}
        <div className={styles.headlineWrapper}>
          <h2 className={styles.headline} ref={headlineRef}>
            Ready to source<br />
            with a manufacturer<br />
            <em className={styles.yellowAccent}>you can rely on?</em>
          </h2>
        </div>

        {/* ── SUBTLE PAPER FOLDING REGISTRATION LINE (SVG STROKE DRAW) ── */}
        <div className={styles.foldLineContainer}>
          <svg className={styles.foldSvg} viewBox="0 0 1200 24" fill="none" preserveAspectRatio="none" aria-hidden="true">
            {/* Background dashed paper crease line */}
            <line x1="0" y1="12" x2="1200" y2="12" stroke="rgba(249, 250, 245, 0.14)" strokeWidth="1.5" strokeDasharray="6 6" />
            {/* Active yellow registration stroke */}
            <path ref={foldLineRef} d="M 0 12 L 1200 12" stroke="var(--color-yellow)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className={styles.foldTag}>FOLD CREASE · 0.15mm TOLERANCE</span>
        </div>

        {/* ── LOWER ASYMMETRIC CONTENT & DISTINCTIVE CTA ROW ── */}
        <div className={styles.lowerRow} ref={subContentRef}>

          {/* Left Commitment Note */}
          <div className={styles.commitmentBlock}>
            <span className={styles.commitmentLabel}>DIRECT FACTORY SOURCING</span>
            <p className={styles.commitmentText}>
              Hands-on paper trade experience since 1988. Container load optimization, predictable lead times, and transparent MOQ structures for global procurement.
            </p>
          </div>

          {/* Right Supporting Copy & Distinctive Editorial CTA */}
          <div className={styles.ctaBlock}>
            <p className={styles.copy}>
              Request a quote and our export team will respond with
              pricing, MOQs, and lead times.
            </p>

            <div className={styles.distinctiveCtaWrap}>
              <div className={styles.yellowHoverBar} />
              <Button href="/contact-us" variant="white" size="large" hasArrow={true}>
                Request a Quote
              </Button>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BRAND WORDMARK ── */}
        <div className={styles.wordmark} aria-hidden="true">Twofold</div>

      </div>
    </section>
  );
}
