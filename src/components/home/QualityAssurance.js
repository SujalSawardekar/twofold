'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './QualityAssurance.module.css';

const CARDS = [
  {
    title: 'Substrate & Paper Audits',
    image: '/images/editorial/notebook-detail.jpg',
    alt: 'Paper substrate GSM and opacity inspection',
    description: 'Paper GSM, opacity, brightness, and burst factor verified before reel movement to ensure optimal ink absorption.',
    staggerClass: styles.cardStagger1,
    link: '/about-us',
  },
  {
    title: 'In-Process Line Audits',
    image: '/images/editorial/facility.jpg',
    alt: 'High-speed automated paper converting line inspection',
    description: 'Continuous monitoring of ruling line alignment, fold crease accuracy, and stitch/spine tension across automated runs.',
    staggerClass: styles.cardStagger2,
    link: '/about-us',
  },
  {
    title: 'AQL 2.5 Export Inspection',
    image: '/images/editorial/aql-inspection.jpg',
    alt: 'Acceptance Quality Level AQL 2.5 finished batch sampling',
    description: 'Acceptance Quality Level (AQL 2.5) sampling applied to finished batches prior to carton packing and JNPT port dispatch.',
    staggerClass: styles.cardStagger3,
    link: '/about-us',
  },
];

export default function QualityAssurance() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length < 3) return;

    const isDesktop = window.innerWidth > 840;

    if (isDesktop) {
      // ── HIGH-PERFORMANCE SCRUBBED SCROLL TIMELINE ──
      // Tight initial spacing (12px gap between header description and Card 1)
      // On scroll: Header glides UPWARD off-screen (y: -260, opacity: 0)
      // All 3 cards elevate upward to y: -180px into the header position
      // Full generous card height preserved (min-height: 520px+)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=75%',
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Step 1: Header glides UPWARD and fades out completely in the first 20% of scroll
      if (headerRef.current) {
        tl.to(
          headerRef.current,
          {
            y: -180,
            opacity: 0,
            ease: 'power2.in',
            duration: 0.25,
          },
          0
        );
      }

      // Step 2: Card 01 moves UPWARD into header top space (0 -> -110px)
      tl.to(
        cards[0],
        {
          y: -110,
          ease: 'power1.inOut',
          duration: 0.7,
        },
        0
      );

      // Step 3: Card 02 moves UPWARD from lower position (120px -> -110px) to level with Card 1
      tl.fromTo(
        cards[1],
        { y: 120 },
        {
          y: -110,
          ease: 'power1.inOut',
          duration: 0.8,
        },
        0.1
      );

      // Step 4: Card 03 moves UPWARD from lower position (240px -> -110px) to level with Cards 1 & 2
      tl.fromTo(
        cards[2],
        { y: 240 },
        {
          y: -110,
          ease: 'power1.inOut',
          duration: 0.8,
        },
        0.35
      );

      // Step 5: Brief dwell hold for card alignment
      tl.to({}, { duration: 0.2 });
    }
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef} id="quality-assurance">
      <div className={styles.inner}>

        {/* ── HEADER (Shifts UPWARD off-screen on scroll) ── */}
        <div className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>QUALITY ASSURANCE</span>
          
          {/* Strictly Two Lines on Desktop */}
          <h2 className={styles.headline}>
            <span className={styles.headlineRow}>Uncompromising Standards for</span>
            <span className={styles.headlineRow}>Global Export Quality.</span>
          </h2>
        </div>

        {/* ── 3-COLUMN STAGGERED EDITORIAL CARDS ── */}
        <div className={styles.cardGrid}>
          {CARDS.map((card, idx) => (
            <div
              key={card.title}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`${styles.card} ${card.staggerClass}`}
            >
              {/* Title at Top */}
              <div className={styles.cardTop}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
              </div>

              {/* Arch / Capsule Photography Crop (Reference Matched) */}
              <div className={styles.imageWrapper}>
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 900px) 220px, 260px"
                  className={styles.cardImage}
                />
              </div>

              {/* Description & Explore Button at Bottom */}
              <div className={styles.cardBody}>
                <p className={styles.cardDesc}>{card.description}</p>
                
                <Link href={card.link} className={styles.ctaBtn} aria-label={`Explore ${card.title}`}>
                  <span>EXPLORE</span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
