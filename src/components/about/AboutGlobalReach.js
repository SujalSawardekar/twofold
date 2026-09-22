'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './AboutGlobalReach.module.css';

const WORKFLOW_STEPS = [
  {
    num: '01',
    badge: '1',
    category: 'PHASE 01 · SPECIFICATION',
    navTitle: 'Order Confirmation',
    title: 'Order Confirmation',
    summary: 'Detailed technical specifications and packaging locked.',
    desc: 'Substrate GSM, page count specs, ruling lines, binding formats, and carton packaging parameters verified and confirmed before machine scheduling.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    num: '02',
    badge: '2',
    category: 'PHASE 02 · HIGH-SPEED CONVERTING',
    navTitle: 'Production & Converting',
    title: 'Production & Converting',
    summary: 'Automated converting and precision binding at Palghar.',
    desc: 'Reel-fed flexographic ruling, automated folding, Smyth-sewn stitching, wire-O binding, and precision trimming executed on dedicated high-speed production lines.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    num: '03',
    badge: '3',
    category: 'PHASE 03 · QUALITY AUDIT',
    navTitle: 'AQL Inspection',
    title: 'Pre-Shipment AQL Inspection',
    summary: 'Standardized sampling protocol before packing.',
    desc: 'Every batch is sampled against defined Acceptance Quality Limit (AQL 2.5) standards for ruling alignment, burst strength, and edge integrity prior to carton packing.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    num: '04',
    badge: '4',
    category: 'PHASE 04 · CUSTOMS & CLEARANCE',
    navTitle: 'Export Documentation',
    title: 'Export Documentation',
    summary: 'Full maritime and customs compliance paperwork.',
    desc: 'Complete export filings: Commercial Invoice, Packing List, Certificate of Origin, Bill of Lading, and phytosanitary certificates prepared with zero discrepancies.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    num: '05',
    badge: '5',
    category: 'PHASE 05 · PORT TRANSIT',
    navTitle: 'JNPT Port Transit',
    title: 'Shipment via Nhava Sheva (JNPT)',
    summary: "Direct bonded corridor from Palghar to India's premier port.",
    desc: 'Short transit distance from our Palghar plant to Nhava Sheva (JNPT) container terminals allows expedited port gate-in, container stuffing, and maritime vessel loading.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 17h20M2 12h20M12 2v20M7 5l5-3 5 3" />
      </svg>
    ),
  },
  {
    num: '06',
    badge: '6',
    category: 'PHASE 06 · OVERSEAS DISCHARGE',
    navTitle: 'Global Port Delivery',
    title: 'Destination Port Delivery',
    summary: 'Seamless arrival across 5 global continental markets.',
    desc: 'Ocean container dispatch with real-time shipment tracking, bill of lading releases, and smooth customs clearance for distributors across Africa, the Middle East, Europe, and the Americas.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

export default function AboutGlobalReach() {
  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const totalSteps = WORKFLOW_STEPS.length;

    // Pin the section and scroll smoothly through all 6 steps
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${totalSteps * 75}vh`,
      pin: pinContainerRef.current,
      pinSpacing: true,
      scrub: 0.3,
      anticipatePin: 1,
      snap: {
        snapTo: 1 / (totalSteps - 1),
        duration: { min: 0.2, max: 0.4 },
        delay: 0.05,
        ease: 'power1.inOut',
      },
      onUpdate: (self) => {
        const step = Math.min(
          totalSteps - 1,
          Math.max(0, Math.round(self.progress * (totalSteps - 1)))
        );
        setActiveIdx(step);
      },
    });

    return () => {
      trigger.kill();
    };
  }, { scope: sectionRef });

  const activeStep = WORKFLOW_STEPS[activeIdx];
  const progressPercent = (activeIdx / (WORKFLOW_STEPS.length - 1)) * 100;

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      id="step-by-step-workflow"
      aria-label="Step-by-Step Export Workflow"
    >
      <div className={styles.pinContainer} ref={pinContainerRef}>
        <div className={styles.inner}>

          {/* ── HEADER ── */}
          <div className={styles.header}>
            <div className={styles.badgeRow}>
              <span className={styles.sectionBadge}>EXPORT LOGISTICS WORKFLOW</span>
            </div>
            <h2 className={styles.headline}>
              Step-by-Step Workflow — <em>From Order to Destination Port.</em>
            </h2>
            <p className={styles.subhead}>
              Scroll down to advance through each of our 6 disciplined export stages.
            </p>
          </div>

          {/* ── INTERACTIVE SPIRAL WIRE WORKFLOW STAGE ── */}
          <div className={styles.workflowContainer}>

            {/* ── SLEEK ARCHITECTURAL PROGRESS CONNECTOR RAIL ── */}
            <div className={styles.railTrackWrapper} aria-hidden="true">
              <div className={styles.railBackgroundTrack} />
              <div
                className={styles.railActiveTrack}
                style={{ width: `${(activeIdx / (WORKFLOW_STEPS.length - 1)) * 100}%` }}
              />
            </div>

            {/* 6 Step Nodes Row */}
            <div className={styles.stepsNodesRow}>
              {WORKFLOW_STEPS.map((step, idx) => {
                const isActive = idx === activeIdx;
                const isPassed = idx < activeIdx;
                return (
                  <div
                    key={step.num}
                    className={`${styles.stepNodeItem} ${isActive ? styles.nodeActive : ''} ${isPassed ? styles.nodePassed : ''}`}
                    onClick={() => setActiveIdx(idx)}
                    role="button"
                    tabIndex={0}
                    suppressHydrationWarning
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveIdx(idx);
                      }
                    }}
                    aria-label={`Step ${step.num}: ${step.title}`}
                  >
                    <div className={styles.nodeCircle}>
                      <span className={styles.nodeIconWrap}>{step.icon}</span>
                      <span className={styles.nodeBadgeNum}>{step.badge}</span>
                    </div>

                    <div className={styles.nodeText}>
                      <span className={styles.nodeStepTag}>STEP {step.num}</span>
                      <h3 className={styles.nodeTitle}>{step.navTitle}</h3>
                    </div>

                    {isActive && <div className={styles.activePulseRing} />}
                  </div>
                );
              })}
            </div>

            {/* ── ACTIVE CARD STAGE (Brand Guidelines Palette) ── */}
            <div className={styles.activeCardStage}>
              <div className={styles.activeCard} key={activeStep.num}>
                
                <div className={styles.activeCardHeader}>
                  <div className={styles.categoryPill}>
                    <span className={styles.pillDot} />
                    <span>{activeStep.category}</span>
                  </div>
                  <div className={styles.stepCounterBadge}>
                    STEP 0{activeIdx + 1} OF 0{WORKFLOW_STEPS.length}
                  </div>
                </div>

                <div className={styles.activeCardBody}>
                  <h4 className={styles.activeStepHeading}>{activeStep.title}</h4>
                  <p className={styles.activeStepSummary}>{activeStep.summary}</p>
                  <p className={styles.activeStepDescription}>{activeStep.desc}</p>
                </div>

                <div className={styles.activeCardFooter}>
                  <div className={styles.footerProtocol}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>VERIFIED EXPORT PROTOCOL · PALGHAR TO JNPT MARITIME CORRIDOR</span>
                  </div>

                  <div className={styles.stepNavigationBtns}>
                    <button
                      type="button"
                      disabled={activeIdx === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIdx((prev) => Math.max(0, prev - 1));
                      }}
                      className={styles.navStepBtn}
                      aria-label="Previous step"
                      suppressHydrationWarning
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      disabled={activeIdx === WORKFLOW_STEPS.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIdx((prev) => Math.min(WORKFLOW_STEPS.length - 1, prev + 1));
                      }}
                      className={styles.navStepBtn}
                      aria-label="Next step"
                      suppressHydrationWarning
                    >
                      →
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
