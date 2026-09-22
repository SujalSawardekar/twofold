'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './WhoWeAre.module.css';

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  const notebookRef = useRef(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Main facility image clip reveal
    gsap.fromTo(
      `.${styles.mainFrame}`,
      { clipPath: 'inset(0% 100% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    );

    // Secondary notebook image parallax
    gsap.to(notebookRef.current, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Text reveal
    gsap.fromTo(
      `.${styles.statement}`,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.statement}`,
          start: 'top 85%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      `.${styles.bodyBlock}`,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.bodyBlock}`,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef} id="who-we-are">
      <div className={styles.inner}>

        {/* ── Section Header ── */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Who We Are</span>
          <h2 className={styles.statement}>
            A Manufacturer, Not Just <em>a Supplier.</em>
          </h2>
        </div>

        {/* ── Main composition grid ── */}
        <div className={styles.compositionGrid}>

          {/* Large facility image */}
          <div className={styles.mainImageArea}>
            <div className={styles.mainFrame}>
              <Image
                src="/images/editorial/facility.jpg"
                alt="Twofold manufacturing facility — Palghar"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className={styles.mainImg}
              />
            </div>

            {/* Overlapping notebook image */}
            <div className={styles.notebookFrame} ref={notebookRef}>
              <Image
                src="/images/editorial/notebook-detail.jpg"
                alt="Quality notebook detail"
                fill
                sizes="220px"
                className={styles.notebookImg}
              />
            </div>
          </div>

          {/* Right: editorial text block */}
          <div className={styles.textArea}>
            <div className={styles.bodyBlock}>
              <p className={styles.copy}>
                At Twofold, we manufacture and export paper stationery to
                distributors, wholesalers and importers across the globe —
                combining hands-on production experience with the scale that
                high-volume export orders demand.
              </p>

              <div className={styles.pillars}>
                {['Manufacturer', 'Experience', 'Scale', 'Craftsmanship'].map(p => (
                  <span key={p} className={styles.pillar}>{p}</span>
                ))}
              </div>

              <div style={{ marginTop: '2rem' }}>
                <Button href="/about-us" variant="primary" hasArrow>
                  Read Our Story
                </Button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
