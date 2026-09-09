'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './ContactHero.module.css';

export default function ContactHero() {
  const containerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const visualRef = useRef(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReduced) return;

    if (
      !eyebrowRef.current ||
      !headingRef.current ||
      !visualRef.current
    ) {
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    tl.from(eyebrowRef.current, {
      opacity: 0,
      y: 16,
      duration: 0.8,
      delay: 0.1,
    })
      .from(
        headingRef.current,
        {
          opacity: 0,
          y: 28,
          duration: 1,
        },
        '-=0.5'
      )
      .from(
        visualRef.current,
        {
          opacity: 0,
          y: 32,
          scale: 0.985,
          duration: 1.1,
        },
        '-=0.7'
      );
  }, { scope: containerRef });

  return (
    <section className={styles.heroSection} aria-label="Contact Twofold" ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.heroSplit}>
          
          {/* Left Side: Text column */}
          <div className={styles.textColumn}>
            
            <div className={styles.eyebrowWrap} ref={eyebrowRef}>
              <span className={styles.eyebrow}>CONTACT TWO FOLD</span>
              <span className={styles.eyebrowLine} aria-hidden="true" />
            </div>

            <h1 className={styles.mainHeading} ref={headingRef}>
              Let’s Build Your<br />
              Next Stationery<br />
              <span className={styles.headingAccent}>Range.</span>
            </h1>

          </div>

          {/* Right Side: Premium stationery visual */}
          <div className={styles.visualColumn} ref={visualRef}>
            <div className={styles.imageFrame}>
              <Image
                src="/images/editorial/notebook-detail.jpg"
                alt="Twofold premium notebook paper craftsmanship and binding finish"
                fill
                priority
                sizes="(max-width: 960px) 100vw, (max-width: 1400px) 48vw, 650px"
                className={styles.heroImage}
              />
              <div className={styles.imageOverlay} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
