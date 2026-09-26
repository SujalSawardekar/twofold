'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './WhyBuyers.module.css';

const REASONS = [
  {
    id: 'r1',
    number: '01 / 06',
    stepNum: '01',
    category: 'STEP 01 · SPECIFICATION & CONTRACT',
    title: 'Order Finalization',
    subtitle: null,
    desc: 'Finalizing technical specifications, paper grammage, ruling details, binding types, order quantities, and delivery schedules with full commercial transparency.',
    image: '/images/editorial/notebook-detail.jpg',
    alt: 'Step 01 - Order Finalization and client specification review',
  },
  {
    id: 'r2',
    number: '02 / 06',
    stepNum: '02',
    category: 'STEP 02 · ARTWORK & PROOFING',
    title: 'Designing & Pre-Press',
    subtitle: null,
    desc: 'Cover artwork preparation, plate making, layout proofs, color calibration, and pre-press validation to ensure precise print reproduction.',
    image: '/images/editorial/facility.jpg',
    alt: 'Step 02 - Designing and pre-press artwork proofing',
  },
  {
    id: 'r3',
    number: '03 / 06',
    stepNum: '03',
    category: 'STEP 03 · FSC®-CERTIFIED SUBSTRATES',
    title: 'Procurement',
    subtitle: null,
    desc: 'Sourcing FSC®-certified woodfree paper reels, high-tensile cover stocks, and eco-friendly inks directly from certified paper mills.',
    image: '/images/editorial/serve-brands.jpg',
    alt: 'Step 03 - Raw material procurement and paper reel sourcing',
  },
  {
    id: 'r4',
    number: '04 / 06',
    stepNum: '04',
    category: 'STEP 04 · QUALITY STANDARDS',
    title: 'Manufacturing',
    subtitle: 'governed by ISO 9001: 2015 Standards',
    desc: 'High-speed automated flexographic ruling, continuous folding, wire stitching, and binding operating strictly under ISO 9001: 2015 quality protocols.',
    image: '/images/editorial/hero-factory.jpg',
    alt: 'Step 04 - High-speed manufacturing governed by ISO 9001: 2015 standards',
  },
  {
    id: 'r5',
    number: '05 / 06',
    stepNum: '05',
    category: 'STEP 05 · AQL 2.5 SAMPLING & PACKAGING',
    title: 'Packing & Quality Assurance',
    subtitle: null,
    desc: 'Acceptance Quality Level (AQL 2.5) batch inspection, moisture-barrier shrink wrapping, and reinforced corrugated carton packing.',
    image: '/images/editorial/aql-inspection.jpg',
    alt: 'Step 05 - Packing and quality assurance AQL inspection',
  },
  {
    id: 'r6',
    number: '06 / 06',
    stepNum: '06',
    category: 'STEP 06 · JNPT SEAPORT LOGISTICS',
    title: 'Container Stuffing & Dispatch',
    subtitle: null,
    desc: 'Precision palletization, direct container stuffing, and export dispatch via Nhava Sheva (JNPT) seaport just 90 minutes from our facility.',
    image: '/images/editorial/serve-importers.jpg',
    alt: 'Step 06 - Container stuffing and JNPT seaport dispatch',
  },
];

export default function WhyBuyers() {
  const [activeCardIdx, setActiveCardIdx] = useState(0);

  const sectionRef = useRef(null);
  const goldPathRef = useRef(null);
  const cardsRef = useRef([]);

  const setCardRef = useCallback((el, idx) => {
    cardsRef.current[idx] = el;
  }, []);

  useGSAP(() => {
    const section = sectionRef.current;
    const goldPath = goldPathRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !goldPath || cards.length < 6) return;

    // ── Measure SVG length for smooth progressive left-to-right filling ──
    const pathLength = goldPath.getTotalLength();
    gsap.set(goldPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // ── INITIAL STATE: Card 01 centered; Card 02 peeks on right edge ──
    cards.forEach((card, i) => {
      if (i === 0) {
        gsap.set(card, {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          visibility: 'visible',
          pointerEvents: 'auto',
        });
      } else if (i === 1) {
        gsap.set(card, {
          xPercent: 108,
          opacity: 0.35,
          scale: 0.9,
          visibility: 'visible',
          pointerEvents: 'auto',
        });
      } else {
        gsap.set(card, {
          xPercent: 180,
          opacity: 0,
          scale: 0.85,
          visibility: 'hidden',
          pointerEvents: 'none',
        });
      }
    });

    const totalSteps = cards.length - 1; // 5 transitions
    const stepDuration = 1;
    const totalTransitionDuration = totalSteps * stepDuration; // 5.0
    const dwellDuration = 0.8;
    const totalDuration = totalTransitionDuration + dwellDuration;

    // ── PINNED SCROLL TIMELINE ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=450%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const tProgress = Math.min(1, p * (totalDuration / totalTransitionDuration));
          const currentStepFloat = tProgress * totalSteps;
          const activeIndex = Math.min(totalSteps, Math.round(currentStepFloat));
          setActiveCardIdx(activeIndex);
        },
      },
    });

    // ── PROGRESSIVELY FILL CONNECTING LINE FROM LEFT TO RIGHT ──
    tl.to(
      goldPath,
      {
        strokeDashoffset: 0,
        ease: 'none',
        duration: totalTransitionDuration,
      },
      0
    );

    // ── SCROLL-DRIVEN CARD-BY-CARD STORYTELLING SEQUENCE WITH PEEKING CARDS ──
    for (let i = 0; i < totalSteps; i++) {
      const currentCard = cards[i];
      const nextCard = cards[i + 1];
      const futureCard = cards[i + 2];
      const prevCard = cards[i - 1];
      const startTime = i * stepDuration;

      // Make incoming card visible
      tl.set(nextCard, { visibility: 'visible', pointerEvents: 'auto' }, startTime);
      if (futureCard) {
        tl.set(futureCard, { visibility: 'visible', pointerEvents: 'auto' }, startTime);
      }

      // Outgoing card: CENTER (0) -> moves LEFT to peek (-108)
      tl.to(
        currentCard,
        {
          xPercent: -108,
          opacity: 0.35,
          scale: 0.9,
          ease: 'power2.inOut',
          duration: stepDuration,
        },
        startTime
      );

      // Incoming card: peeking RIGHT (108) -> settles in CENTER (0)
      tl.to(
        nextCard,
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.inOut',
          duration: stepDuration,
        },
        startTime
      );

      // Future card: off-screen (180) -> peeking RIGHT (108)
      if (futureCard) {
        tl.to(
          futureCard,
          {
            xPercent: 108,
            opacity: 0.35,
            scale: 0.9,
            ease: 'power2.inOut',
            duration: stepDuration,
          },
          startTime
        );
      }

      // Previous card: peeking LEFT (-108) -> moves off-screen LEFT (-180)
      if (prevCard) {
        tl.to(
          prevCard,
          {
            xPercent: -180,
            opacity: 0,
            scale: 0.85,
            ease: 'power2.inOut',
            duration: stepDuration,
          },
          startTime
        );
        tl.set(prevCard, { visibility: 'hidden', pointerEvents: 'none' }, startTime + stepDuration);
      }
    }

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, { scope: sectionRef });

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      id="why-twofold"
      data-theme="dark"
      aria-label="Why Buyers Choose Twofold — Storytelling Scroll Experience"
    >
      {/* Subtle ambient lighting */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.pinnedContainer}>

        {/* ── TOP HEADER (With safe top clearance below floating navbar) ── */}
        <div className={styles.header}>
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrow}>WHY TWOFOLD</span>
            <span className={styles.eyebrowDot}>·</span>
            <span className={styles.eyebrowSub}>STEP-BY-STEP PROCESS</span>
          </div>

          <h2 className={styles.headline}>
            The Order <em>Flow.</em>
          </h2>
        </div>

        {/* ── CONTINUOUS WAVY CONNECTING LINE (Behind Cards) ── */}
        <div className={styles.lineContainer} aria-hidden="true">
          <svg
            className={styles.lineSvg}
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Dotted unfilled base wavy path spanning full width */}
            <path
              d="M -50 35 C 180 8, 360 52, 540 30 C 720 8, 900 52, 1080 30 C 1260 8, 1440 52, 1620 30"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="2"
              strokeDasharray="4 6"
              className={styles.baseDottedPath}
            />
            {/* Solid Twofold gold progress wavy path that fills from left to right */}
            <path
              ref={goldPathRef}
              d="M -50 35 C 180 8, 360 52, 540 30 C 720 8, 900 52, 1080 30 C 1260 8, 1440 52, 1620 30"
              stroke="#E5A93C"
              strokeWidth="2.4"
              strokeLinecap="round"
              className={styles.goldProgressPath}
            />
          </svg>
        </div>

        {/* ── SINGLE ACTIVE CARD STAGE (Dead center in viewport) ── */}
        <div className={styles.stage}>
          {REASONS.map((reason, idx) => (
            <div
              key={reason.id}
              ref={(el) => setCardRef(el, idx)}
              className={styles.storyCard}
              tabIndex={0}
              aria-label={`Chapter ${reason.number}: ${reason.title}`}
            >
              {/* Wide Photographic Image Frame with Badge */}
              <div className={styles.cardImageFrame}>
                <Image
                  src={reason.image}
                  alt={reason.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 680px"
                  priority={idx === 0}
                  className={styles.cardImg}
                />
                <div className={styles.cardBadge}>{reason.number}</div>
                <div className={styles.cardImageOverlay} />
              </div>

              {/* Editorial Content Below Image */}
              <div className={styles.cardBody}>
                <div className={styles.cardKicker}>{reason.category}</div>
                <h3 className={styles.cardTitle}>{reason.title}</h3>
                {reason.subtitle && <p className={styles.cardSubtitle}>{reason.subtitle}</p>}
                <p className={styles.cardDesc}>{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
