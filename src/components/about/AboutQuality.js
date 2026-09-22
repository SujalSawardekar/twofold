'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './AboutQuality.module.css';

const COMPLIANCE_CARDS = [
  {
    id: 'aa',
    code: '01',
    badge: 'AQL 2.5',
    title: 'AQL Pre-Shipment Audit',
    desc: 'Structured Acceptance Quality Limit sampling across every production batch prior to export container packing and seal verification.',
    metric: 'AQL 2.5 PROTOCOL · CARTON DROP VERIFIED',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 'bb',
    code: '02',
    badge: 'LAB TESTED',
    title: 'Paper Substrate Verification',
    desc: 'Paper GSM, opacity, tensile burst strength, and ink bleed resistance verified before reel-fed converting begins.',
    metric: 'GSM TOLERANCE ±2% · BURST FACTOR VERIFIED',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <circle cx="10" cy="9" r="1.5" />
      </svg>
    ),
  },
  {
    id: 'cc',
    code: '03',
    badge: 'PRECISION',
    title: 'In-Line Registration Audits',
    desc: 'Continuous automated checks on ruling line alignment, fold crease accuracy, and spine stitch tension during active machine runs.',
    metric: 'ALIGNMENT ±0.15MM · SPINE CALIBRATED',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'dd',
    code: '04',
    badge: 'JNPT EXPORT',
    title: 'Container Maritime Clearance',
    desc: 'Direct container stuffing, pallet humidity protection, and zero-discrepancy export documentation prior to JNPT vessel loading.',
    metric: 'NHAVA SHEVA CORRIDOR · BATCH CODING',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

export default function AboutQuality() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const proofingRef = useRef(null);
  const [activeCardId, setActiveCardId] = useState('aa');

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Refresh ScrollTrigger to recalculate after pinned sections
    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
      defaults: { ease: 'power3.out' },
    });

    tl.fromTo(
      `.${styles.header}`,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
    .fromTo(
      cardsRef.current?.children || [],
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.65 },
      '-=0.3'
    )
    .fromTo(
      proofingRef.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.3'
    );

  }, { scope: sectionRef });

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      id="quality-compliance"
      aria-label="Quality and Compliance at Twofold"
    >
      <div className={styles.inner}>

        {/* ── SECTION MASTHEAD (Where Compliance Meets Scale) ── */}
        <div className={styles.header}>
          <div className={styles.pillWrap}>
            <span className={styles.compliancePill}>QUALITY &amp; COMPLIANCE</span>
          </div>
          <h2 className={styles.headline}>
            Where Compliance<br />
            <em>Meets Scale</em>
          </h2>
          <p className={styles.subhead}>
            Every product is inspected against defined AQL (Acceptable Quality Limit) standards before
            it leaves our Palghar facility, delivering structured quality and operational clarity across international shipments.
          </p>
        </div>

        {/* ── UNIFORM COMPLIANCE CARDS GRID ── */}
        <div className={styles.staggeredGrid} ref={cardsRef}>
          {COMPLIANCE_CARDS.map((card) => (
            <div
              key={card.id}
              className={styles.staggerCard}
              suppressHydrationWarning
            >
              {/* Top Code & Badge */}
              <div className={styles.cardTop}>
                <div className={styles.iconContainer}>
                  {card.icon}
                </div>
                <span className={styles.cardBadgePill}>{card.badge}</span>
              </div>

              {/* Content */}
              <div className={styles.cardBody}>
                <span className={styles.codeText}>PROTOCOL {card.code}</span>
                <h3 className={styles.cardHeading}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.desc}</p>
              </div>

              {/* Metric Footer */}
              <div className={styles.cardFooter}>
                <span className={styles.metricText}>{card.metric}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── QC INSPECTION SPECIMEN BENCH FOOTER (Authentic Factory Proof) ── */}
        <div className={styles.proofingSpread} ref={proofingRef}>
          <div className={styles.specimenFrame}>
            <Image
              src="/images/editorial/aql-inspection.jpg"
              alt="Twofold quality assurance specialist carrying out tactile paper substrate, ruling, and spine binding inspection"
              fill
              sizes="(max-width: 1400px) 100vw, 1280px"
              className={styles.inspectionImg}
            />
            <div className={styles.specimenScrim} />

            <div className={styles.specimenTagTL}>
              <span className={styles.specimenTagNum}>QC SPECIMEN NO. 2624</span>
              <span className={styles.specimenTagTitle}>PALGHAR QUALITY AUDIT WORKSTATION</span>
            </div>

            <div className={styles.qcStamp}>
              <div className={styles.qcStampInner}>
                <span className={styles.stampCheck}>✓</span>
                <div className={styles.stampText}>
                  <span className={styles.stampMain}>AQL 2.5 CERTIFIED</span>
                  <span className={styles.stampSub}>EXPORT CONTAINER CLEARANCE</span>
                </div>
              </div>
            </div>

            <div className={styles.specimenCaption}>
              FIG. 03 — SPECIALIST CONDUCTING TACTILE SUBSTRATE, SPINE BINDING &amp; RULING INSPECTION PRIOR TO CONTAINER PACKING
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
