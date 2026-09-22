'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './AboutInfrastructure.module.css';

const INFRA_FEATURES = [
  {
    num: '01',
    tag: 'WORKFORCE & CLUSTER',
    title: 'Skilled Workforce',
    desc: 'Experienced production staff based in an established notebook-manufacturing cluster, bringing deep expertise in precision ruling, Smyth stitching, and binding line operations.',
    illustration: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.cardSvg}>
        <circle cx="60" cy="40" r="20" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="60" cy="40" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M25 95c0-19.33 15.67-35 35-35s35 15.67 35 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="95" x2="105" y2="95" stroke="currentColor" strokeWidth="2" />
        <circle cx="28" cy="52" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M10 95c0-10 8-18 18-18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <circle cx="92" cy="52" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M110 95c0-10-8-18-18-18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    num: '02',
    tag: 'RAW MATERIAL ECOSYSTEM',
    title: 'Established Supply Chain',
    desc: 'Reliable raw-material substrate sourcing supporting consistent lead times, with secured paper mill partnerships for woodfree, high-bulk, and specialty writing papers.',
    illustration: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.cardSvg}>
        <rect x="25" y="25" width="70" height="70" rx="8" stroke="currentColor" strokeWidth="2" />
        <rect x="35" y="35" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="60" y1="15" x2="60" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="95" x2="60" y2="105" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="60" x2="25" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="95" y1="60" x2="105" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="60" cy="60" r="12" stroke="currentColor" strokeWidth="2" />
        <path d="M54 60l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '03',
    tag: 'SCALE & CONTAINER VOLUMES',
    title: 'Export-Ready Capacity',
    desc: 'Production capacity built to handle recurring, high-volume export orders, high-speed automated reel converting, and optimized container load packing.',
    illustration: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.cardSvg}>
        <path d="M20 75L60 95L100 75L60 55L20 75Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 45L60 65L100 45L60 25L20 45Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <line x1="20" y1="45" x2="20" y2="75" stroke="currentColor" strokeWidth="2" />
        <line x1="60" y1="65" x2="60" y2="95" stroke="currentColor" strokeWidth="2" />
        <line x1="100" y1="45" x2="100" y2="75" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="25" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: '04',
    tag: 'LOGISTICS & PORT CORRIDOR',
    title: 'Strategic Location',
    desc: "Palghar's manufacturing ecosystem plus immediate proximity to Nhava Sheva (JNPT) port for streamlined customs clearance, reduced inland haulage, and swift maritime dispatch.",
    illustration: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.cardSvg}>
        <circle cx="60" cy="60" r="42" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M60 25C43.43 25 30 38.43 30 55c0 23.33 30 45 30 45s30-21.67 30-45c0-16.57-13.43-30-30-30z" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="53" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M85 85L105 105" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function AboutInfrastructure() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    ScrollTrigger.refresh();

    const cards = gridRef.current?.querySelectorAll(`.${styles.featureCard}`) || [];
    gsap.fromTo(
      cards,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef} id="infrastructure" aria-label="Infrastructure Highlights">
      <div className={styles.inner}>

        {/* ── SECTION HEADER ── */}
        <div className={styles.header}>
          <div className={styles.badgeRow}>
            <span className={styles.sectionPill}>INFRASTRUCTURE HIGHLIGHTS</span>
          </div>
          <h2 className={styles.headline}>
            All the Capabilities You Need to<br />
            <em>Source at Global Scale.</em>
          </h2>
          <p className={styles.subhead}>
            Direct manufacturing infrastructure designed to eliminate intermediaries and deliver
            predictable production cycles, transparent quality control, and container-scale fulfillment.
          </p>
        </div>

        {/* ── 4-CARD MODERN FEATURE GRID (Terrava & Clean Payments Style) ── */}
        <div className={styles.cardsGrid} ref={gridRef}>
          {INFRA_FEATURES.map((feat) => (
            <div key={feat.num} className={styles.featureCard}>
              
              {/* Illustration Frame */}
              <div className={styles.illustrationWrap}>
                <div className={styles.illustrationBg} />
                {feat.illustration}
                <span className={styles.cardNum}>{feat.num}</span>
              </div>

              {/* Text Info */}
              <div className={styles.cardContent}>
                <span className={styles.tagBadge}>{feat.tag}</span>
                <h3 className={styles.cardTitle}>{feat.title}</h3>
                <p className={styles.cardDesc}>{feat.desc}</p>
              </div>

              <div className={styles.cardBottomGlow} aria-hidden="true" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
