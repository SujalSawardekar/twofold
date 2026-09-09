'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './Hero.module.css';

const SLIDES = [
  {
    id: 'set-01',
    badge: 'EXPORT NOTEBOOK RANGE',
    lines: [
      'Precision-Made',
      'Notebooks for',
      'International',
      'Markets.',
    ],
    subtext: 'Exercise books, spiral bound, double wire bound, hard cover Gally bound, centre stitched and glue bound notebooks — plus paper packaging.',
    cards: [
      {
        id: 'c1',
        title: 'Double Wire Bound',
        subtitle: 'Reinforced Double Wire',
        image: '/images/editorial/facility.jpg',
        alt: 'Twofold double wire bound manufacturing facility',
        slotClass: styles.slot1,
        colorClass: styles.cardBgMustard,
      },
      {
        id: 'c2',
        title: 'Hard Cover Gally Bound',
        subtitle: 'Premium Rigid Cover Notebooks',
        image: '/images/editorial/notebook-detail.jpg',
        alt: 'Premium rigid hard cover notebooks with elastic band',
        slotClass: styles.slot2,
        colorClass: styles.cardBgNavy,
      },
      {
        id: 'c3',
        title: 'Centre Stitched & Glue Bound',
        subtitle: 'Economical Bulk Solutions',
        image: '/images/editorial/serve-chainstores.jpg',
        alt: 'Stacked centre stitched notebooks for export',
        slotClass: styles.slot3,
        colorClass: styles.cardBgPlum,
      },
    ],
  },
  {
    id: 'set-02',
    badge: 'VOLUME CONVERTING & SCALE',
    lines: [
      'Engineered for',
      'High-Volume',
      'Global Chain',
      'Distribution.',
    ],
    subtext: 'Automated high-speed flexographic ruling, folding and Smyth-sewn finishing from our Palghar plant. Direct container-load supply worldwide.',
    cards: [
      {
        id: 'c4',
        title: 'Spiral Bound Notebooks',
        subtitle: 'Durable Polypropylene & Kraft',
        image: '/images/editorial/hero-student.jpg',
        alt: 'Students writing in durable spiral notebooks',
        slotClass: styles.slot1,
        colorClass: styles.cardBgMustard,
      },
      {
        id: 'c5',
        title: 'Composition Books',
        subtitle: 'Smyth-Sewn Classic • 192 Pgs',
        image: '/images/editorial/notebook-detail.jpg',
        alt: 'Classic composition books with archival paper',
        slotClass: styles.slot2,
        colorClass: styles.cardBgNavy,
      },
      {
        id: 'c6',
        title: 'Custom Packaging & Export',
        subtitle: 'Full Container Direct Supply',
        image: '/images/editorial/hero-factory.jpg',
        alt: 'High-volume paper packaging and container dispatch',
        slotClass: styles.slot3,
        colorClass: styles.cardBgPlum,
      },
    ],
  },
  {
    id: 'set-03',
    badge: 'BESPOKE PRIVATE LABEL',
    lines: [
      'Custom Formats,',
      'Specialty Papers,',
      'Tailored Brand',
      'Solutions.',
    ],
    subtext: 'From 54 to 100 GSM papers, custom foil stamping and tailored ruling schemes — crafted to meet the exact standards of 15+ countries.',
    cards: [
      {
        id: 'c7',
        title: 'Executive Twin-Wire',
        subtitle: 'Micro-Perforated • 80 GSM',
        image: '/images/editorial/facility.jpg',
        alt: 'Executive registers with double-wire coil binding',
        slotClass: styles.slot1,
        colorClass: styles.cardBgMustard,
      },
      {
        id: 'c8',
        title: 'Heritage Smyth Journal',
        subtitle: 'Lay-Flat 180° • Acid-Free',
        image: '/images/editorial/hero-journal.jpg',
        alt: 'Heritage journal with silk ribbon bookmark',
        slotClass: styles.slot2,
        colorClass: styles.cardBgNavy,
      },
      {
        id: 'c9',
        title: 'Private Label Stationery',
        subtitle: 'OEM Solutions for 15+ Countries',
        image: '/images/editorial/serve-importers.jpg',
        alt: 'Bespoke private label notebook manufacturing',
        slotClass: styles.slot3,
        colorClass: styles.cardBgPlum,
      },
    ],
  },
];

export default function Hero() {
  const [currentSetIdx, setCurrentSetIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const heroRef = useRef(null);
  const contentColRef = useRef(null);
  const floatWrapperRef = useRef(null);
  const cardsDeckRef = useRef(null);
  const currentSetRef = useRef(0);
  const autoTimerRef = useRef(null);

  currentSetRef.current = currentSetIdx;

  // ── Synchronized Slide Transition: Left Editorial Headline & Right Fanned Cards ──
  const changeSet = useCallback((nextIdx) => {
    if (isTransitioning || nextIdx === currentSetRef.current) return;
    setIsTransitioning(true);

    const deckEl = cardsDeckRef.current;
    const colEl = contentColRef.current;

    const currentSlots = deckEl?.querySelectorAll(`.${styles.cardSlot}`);
    const currentLines = colEl?.querySelectorAll(`.${styles.lineText}`);
    const badgeEl = colEl?.querySelector(`.${styles.badge}`);
    const subtextEl = colEl?.querySelector(`.${styles.subtext}`);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSetIdx(nextIdx);

        // After state updates DOM, animate in new slide content
        requestAnimationFrame(() => {
          const newSlots = deckEl?.querySelectorAll(`.${styles.cardSlot}`);
          const newLines = colEl?.querySelectorAll(`.${styles.lineText}`);
          const newBadge = colEl?.querySelector(`.${styles.badge}`);
          const newSubtext = colEl?.querySelector(`.${styles.subtext}`);

          // Animate in new left editorial headline lines through mask
          if (newLines?.length) {
            gsap.fromTo(
              newLines,
              { yPercent: 108 },
              {
                yPercent: 0,
                duration: 0.72,
                stagger: 0.06,
                ease: 'power3.out',
              }
            );
          }

          if (newBadge) {
            gsap.fromTo(
              newBadge,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            );
          }

          if (newSubtext) {
            gsap.fromTo(
              newSubtext,
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power3.out' }
            );
          }

          // Animate in new cards with clearProps so CSS hovers and rotations work seamlessly
          if (newSlots?.length) {
            gsap.fromTo(
              newSlots,
              { y: 30, opacity: 0, scale: 0.92 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.07,
                duration: 0.55,
                ease: 'power3.out',
                clearProps: 'y,scale',
                onComplete: () => {
                  setIsTransitioning(false);
                },
              }
            );
          } else {
            setIsTransitioning(false);
          }
        });
      },
    });

    // Animate out current left editorial text
    if (currentLines?.length) {
      tl.to(
        currentLines,
        {
          yPercent: -108,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power2.in',
        },
        0
      );
    }

    if (badgeEl) {
      tl.to(badgeEl, { opacity: 0, y: -8, duration: 0.25, ease: 'power2.in' }, 0);
    }

    if (subtextEl) {
      tl.to(subtextEl, { opacity: 0, y: -10, duration: 0.28, ease: 'power2.in' }, 0);
    }

    // Animate out current right cards
    if (currentSlots?.length) {
      tl.to(
        currentSlots,
        {
          y: -22,
          opacity: 0,
          scale: 0.94,
          stagger: 0.04,
          duration: 0.32,
          ease: 'power2.in',
        },
        0
      );
    }
  }, [isTransitioning]);

  const handleNext = () => {
    const next = (currentSetRef.current + 1) % SLIDES.length;
    changeSet(next);
  };

  const handlePrev = () => {
    const prev = (currentSetRef.current - 1 + SLIDES.length) % SLIDES.length;
    changeSet(prev);
  };

  // ── Auto-advance Loop ──
  useEffect(() => {
    autoTimerRef.current = setInterval(() => {
      handleNext();
    }, 6500);

    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, []);

  // ── Initial Page-Load Reveal & Organic Floating ──
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Organic continuous floating of the fanned deck
    gsap.to(floatWrapperRef.current, {
      y: -10,
      rotationZ: -0.5,
      duration: 3.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Initial line-by-line masked headline reveal
    const lines = contentColRef.current?.querySelectorAll(`.${styles.lineText}`);
    if (lines?.length) {
      gsap.fromTo(
        lines,
        { yPercent: 105 },
        { yPercent: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
    }

    gsap.from(`.${styles.badge}`,   { opacity: 0, y: 10, duration: 0.6, delay: 0.1, ease: 'power3.out' });
    gsap.from(`.${styles.subtext}`, { opacity: 0, y: 15, duration: 0.7, delay: 0.45, ease: 'power3.out' });
    gsap.from(`.${styles.ctas}`,    { opacity: 0, y: 15, duration: 0.6, delay: 0.65, ease: 'power3.out' });

    // Initial card deck entrance with clearProps
    const initialSlots = cardsDeckRef.current?.querySelectorAll(`.${styles.cardSlot}`);
    if (initialSlots) {
      gsap.fromTo(
        initialSlots,
        { y: 45, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
          clearProps: 'y,scale',
        }
      );
    }
  }, { scope: heroRef });

  const activeSlide = SLIDES[currentSetIdx];
  const activeCards = activeSlide.cards;

  return (
    <section className={styles.hero} ref={heroRef} id="hero" aria-label="Twofold Hero Section">
      {/* ── Subtle Atmospheric Photographic Background ── */}
      <div className={styles.heroBgWrapper} aria-hidden="true">
        <Image
          src="/images/editorial/hero-student-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroBgImg}
        />
        <div className={styles.heroBgOverlay} />
      </div>

      <div className={styles.ambientVignette} aria-hidden="true" />

      {/* ── Viewport Grid ── */}
      <div className={styles.grid}>

        {/* ─── LEFT: Continuous Editorial Content with Masked Reveals ─── */}
        <div className={styles.contentCol} ref={contentColRef}>
          <div className={styles.badge}>
            {activeSlide.badge}
          </div>

          <h1 className={styles.headline} aria-label={activeSlide.lines.join(' ')}>
            {activeSlide.lines.map((line, i) => (
              <span key={`${currentSetIdx}-${i}`} className={styles.lineMask}>
                <span className={styles.lineText}>{line}</span>
              </span>
            ))}
          </h1>

          <p className={styles.subtext}>
            {activeSlide.subtext}
          </p>

        </div>

        {/* ─── RIGHT: 3 Overlapping Fanned Product Cards ─── */}
        <div className={styles.stageCol}>
          <div className={styles.floatWrapper} ref={floatWrapperRef}>
            <div className={styles.cardsDeck} ref={cardsDeckRef}>
              {activeCards.map((card) => (
                <div
                  key={card.id}
                  className={`${styles.cardSlot} ${card.slotClass}`}
                  tabIndex={0}
                >
                  <div className={`${styles.productCard} ${card.colorClass}`}>
                    <div className={styles.cardImageWrap}>
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 768px) 190px, 280px"
                        className={styles.cardImg}
                      />
                    </div>
                    <div className={styles.cardInfo}>
                      <span className={styles.cardTitle}>{card.title}</span>
                      <span className={styles.cardSubtitle}>{card.subtitle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── Unified Action Row: CTAs (Left) + Slide Controls (Right) Aligned on Same Baseline ── */}
      <div className={styles.bottomBar}>
        <div className={styles.ctas}>
          <Link href="/products" className={styles.ctaPrimary}>
            Explore Our Products
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path
                d="M3 7.5h9M9 4l3.5 3.5L9 11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <Link href="/contact-us" className={styles.ctaSecondary}>
            Partner With Us
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path
                d="M3 7.5h9M9 4l3.5 3.5L9 11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className={styles.controls} aria-label="Slide Controls">
          <button
            className={styles.arrowBtn}
            onClick={handlePrev}
            aria-label="Previous Slide"
            data-sound="slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 13L5 8L10 3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className={styles.arrowBtn}
            onClick={handleNext}
            aria-label="Next Slide"
            data-sound="slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
