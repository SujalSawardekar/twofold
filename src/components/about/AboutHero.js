'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './AboutHero.module.css';

export default function AboutHero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const imageFrameRef = useRef(null);
  const pillsRef = useRef(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(`.${styles.eyebrow}`, {
      y: 18,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
    })
    .from(headlineRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.9,
    }, '-=0.4')
    .from(`.${styles.subtitle}`, {
      y: 24,
      opacity: 0,
      duration: 0.7,
    }, '-=0.5')
    .from(pillsRef.current?.children || [], {
      y: 16,
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
    }, '-=0.4')
    .fromTo(imageFrameRef.current, {
      clipPath: 'inset(0% 100% 0% 0%)',
    }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      ease: 'power4.inOut',
    }, '-=0.8');

    // Subtle parallax on image during scroll exit
    gsap.to(`.${styles.facilityImg}`, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section className={styles.section} ref={containerRef} aria-label="About Twofold and Infrastructure">
      <div className={styles.inner}>

        {/* ── ASYMMETRIC GRID ── */}
        <div className={styles.grid}>

          {/* Left: Typographic Column */}
          <div className={styles.textCol}>
            <span className={styles.eyebrow}>ABOUT TWOFOLD</span>

            <h1 className={styles.headline} ref={headlineRef}>
              About Us &amp;<br />
              <em>Infrastructure.</em>
            </h1>

            <p className={styles.subtitle}>
              Twofold is a Palghar-based notebook and stationery manufacturer built on
              paper-trade heritage, manufacturing experience and export capability.
            </p>

            {/* Metadata Pills */}
            <div className={styles.pills} ref={pillsRef}>
              <span className={styles.pill}>
                <span className={styles.pillDot} />
                PALGHAR, MAHARASHTRA
              </span>
              <span className={styles.pill}>
                <span className={styles.pillDot} />
                PAPER TRADE SINCE 1988
              </span>
              <span className={styles.pill}>
                <span className={styles.pillDot} />
                DIRECT FACTORY SOURCING
              </span>
            </div>
          </div>

          {/* Right: Architectural Facility Crop */}
          <div className={styles.imageCol}>
            <div className={styles.imageFrame} ref={imageFrameRef}>
              <Image
                src="/images/editorial/facility.jpg"
                alt="Twofold notebook manufacturing facility at Palghar, Maharashtra"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.facilityImg}
              />
              <div className={styles.imageOverlay} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
