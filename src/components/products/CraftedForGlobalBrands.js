'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './CraftedForGlobalBrands.module.css';

export default function CraftedForGlobalBrands() {
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgesRef = useRef(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    tl.fromTo(
      pillRef.current,
      { opacity: 0, y: 18, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        badgesRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );
  }, { scope: containerRef });

  return (
    <section className={styles.section} ref={containerRef} id="crafted-for-global-brands">
      {/* Decorative Blueprint Corner Crosshairs */}
      <div className={styles.cornerTL} aria-hidden="true">+</div>
      <div className={styles.cornerTR} aria-hidden="true">+</div>
      <div className={styles.cornerBL} aria-hidden="true">+</div>
      <div className={styles.cornerBR} aria-hidden="true">+</div>

      <div className={styles.inner}>
        {/* Top Pill / Badge */}
        <div className={styles.pillWrap} ref={pillRef}>
          <span className={styles.pill}>
            <span className={styles.goldDot} />
            EXPORT QUALITY STATIONERY
          </span>
        </div>

        {/* Main Display Title with Italic Accent */}
        <h2 className={styles.headline} ref={titleRef}>
          Crafted for <em>Global Brands.</em>
        </h2>

        {/* Subtitle Body Text */}
        <p className={styles.subtitle} ref={subtitleRef}>
          High-volume paper stationery manufactured to custom international specifications since 1988.
        </p>

        {/* Micro Capability Spec Badges */}
        <div className={styles.badgeRow} ref={badgesRef}>
          <span className={styles.specBadge}>ISO 9001:2015 CERTIFIED</span>
          <span className={styles.specDot}>·</span>
          <span className={styles.specBadge}>54–100 GSM SUBSTRATES</span>
          <span className={styles.specDot}>·</span>
          <span className={styles.specBadge}>JNPT SEAPORT DISPATCH</span>
        </div>
      </div>
    </section>
  );
}
