'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useSound } from '@/providers/SoundEffectsProvider';
import styles from './NotebookShowcase.module.css';

const products = [
  {
    id: '01',
    category: 'EXERCISE BOOKS',
    title: 'Exercise Books',
    desc: 'Durable staple-bound notebooks designed for schools, institutions, and everyday writing. Available in a range of page counts and ruling patterns.',
    mainImage: '/images/products/exercise-book.jpg',
    mainAlt: 'Twofold Staple-Bound Exercise Book export collection',
    secondaryImages: [
      {
        src: '/images/editorial/notebook-detail.jpg',
        alt: 'Corner and ruling grid detail',
        className: styles.detailTopRight
      },
      {
        src: '/images/editorial/hero-journal.jpg',
        alt: 'Spine and page alignment',
        className: styles.detailBottomLeft
      }
    ]
  },
  {
    id: '02',
    category: 'SPIRAL BOUND NOTEBOOKS',
    title: 'Spiral Bound Notebooks',
    desc: 'Wire-coil binding designed for a smooth, practical writing experience. Lay-flat design for comfortable use.',
    mainImage: '/images/products/spiral-bound.jpg',
    mainAlt: 'Twofold Spiral Bound Notebook with continuous wire coil',
    secondaryImages: [
      {
        src: '/images/editorial/notebook-detail.jpg',
        alt: 'Coil pitch and hole punching detail',
        className: styles.detailTopRight
      },
      {
        src: '/images/editorial/aql-inspection.jpg',
        alt: 'Inspection of spiral bound notebooks',
        className: styles.detailBottomLeft
      }
    ]
  },
  {
    id: '03',
    category: 'DOUBLE WIRE BOUND NOTEBOOKS',
    title: 'Double Wire Bound Notebooks',
    desc: 'Twin-loop wire binding for a clean, professional finish. Popular across retail and corporate markets.',
    mainImage: '/images/products/wiro-bound.jpg',
    mainAlt: 'Twofold Double Wire Bound Notebook with twin-loop spine',
    secondaryImages: [
      {
        src: '/images/editorial/notebook-detail.jpg',
        alt: 'Twin-loop wire closure detail',
        className: styles.detailTopRight
      },
      {
        src: '/images/editorial/facility.jpg',
        alt: 'Precision binding machinery in facility',
        className: styles.detailBottomLeft
      }
    ]
  },
  {
    id: '04',
    category: 'HARD COVER GALLY BOUND NOTEBOOKS',
    title: 'Hard Cover Gally Bound Notebooks',
    desc: 'Rigid cover notebooks with premium gally binding. Built for durability and a premium shelf presence.',
    mainImage: '/images/products/hardcover.jpg',
    mainAlt: 'Twofold Hard Cover Gally Bound Notebook',
    secondaryImages: [
      {
        src: '/images/editorial/hero-journal.jpg',
        alt: 'Rigid board casing and spine finish',
        className: styles.detailTopRight
      },
      {
        src: '/images/editorial/notebook-detail.jpg',
        alt: 'Inner page binding and edges',
        className: styles.detailBottomLeft
      }
    ]
  },
  {
    id: '05',
    category: 'CENTRE STITCHED NOTEBOOKS',
    title: 'Centre Stitched Notebooks',
    desc: 'Saddle-stitched notebooks for lightweight, everyday use. Cost-effective solution for bulk educational orders.',
    mainImage: '/images/products/centre-stitched.jpg',
    mainAlt: 'Twofold Centre Stitched Notebook with lightweight format',
    secondaryImages: [
      {
        src: '/images/editorial/notebook-detail.jpg',
        alt: 'Fine centre saddle stitch detail',
        className: styles.detailTopRight
      },
      {
        src: '/images/editorial/hero-factory.jpg',
        alt: 'High speed production lines',
        className: styles.detailBottomLeft
      }
    ]
  },
  {
    id: '06',
    category: 'GLUE BOUND NOTEBOOKS',
    title: 'Glue Bound Notebooks',
    desc: 'Perfect-bound notebooks with a clean, seamless spine. Suitable for journals, branded notebooks, and retail distribution.',
    mainImage: '/images/products/perfect-bound.jpg',
    mainAlt: 'Twofold Glue Bound Notebook with square flat spine',
    secondaryImages: [
      {
        src: '/images/editorial/hero-journal.jpg',
        alt: 'Seamless flat spine close-up',
        className: styles.detailTopRight
      },
      {
        src: '/images/editorial/notebook-detail.jpg',
        alt: 'Clean trimmed page block',
        className: styles.detailBottomLeft
      }
    ]
  }
];

const AUTO_DURATION = 4000; // 4.0 seconds per product auto-cycle
const CIRCUMFERENCE = 2 * Math.PI * 14; // ~87.9646

export default function NotebookShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const activeIndexRef = useRef(0);
  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const isTransitioningRef = useRef(false);

  const { playClick, playSlide, playHover } = useSound();

  // Synchronize state ref
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Navigate to specific product
  const goToProduct = useCallback((index) => {
    if (index < 0 || index >= products.length) return;
    setProgress(0);
    setActiveIndex(index);
    activeIndexRef.current = index;
    try {
      playSlide?.();
    } catch {
      // safe fallback
    }
  }, [playSlide]);

  const handleNext = useCallback(() => {
    const cur = activeIndexRef.current;
    const nextIdx = (cur + 1) % products.length;
    goToProduct(nextIdx);
  }, [goToProduct]);

  const handlePrev = useCallback(() => {
    const cur = activeIndexRef.current;
    const prevIdx = (cur - 1 + products.length) % products.length;
    goToProduct(prevIdx);
  }, [goToProduct]);

  // ── Step-Locked Scroll & Gesture Handling ──
  // Keeps the showcase stuck on screen through all circles (01 -> 06).
  // Only releases downward to the footer when the user scrolls on the LAST circle (06).
  useEffect(() => {
    let lastWheelTime = 0;
    const WHEEL_COOLDOWN = 450; // ms between discrete step advances
    let touchStartY = 0;

    const onWheel = (e) => {
      const cur = activeIndexRef.current;
      const deltaY = e.deltaY;

      if (Math.abs(deltaY) < 15) return;

      const now = performance.now();
      const scrollY = window.scrollY || window.pageYOffset || 0;

      // When showcase is at the top of the viewport:
      if (scrollY <= 80) {
        if (deltaY > 0) {
          // Scrolling DOWN:
          // If we haven't reached the last circle (06), intercept and step forward
          if (cur < products.length - 1) {
            e.preventDefault();
            e.stopPropagation();

            if (now - lastWheelTime > WHEEL_COOLDOWN) {
              lastWheelTime = now;
              goToProduct(cur + 1);
            }
            return false;
          }
          // If cur === products.length - 1 (Circle 06), ALLOW normal downward scroll to footer!
        } else if (deltaY < 0) {
          // Scrolling UP:
          // If not at the first product, step backward
          if (cur > 0) {
            e.preventDefault();
            e.stopPropagation();

            if (now - lastWheelTime > WHEEL_COOLDOWN) {
              lastWheelTime = now;
              goToProduct(cur - 1);
            }
            return false;
          }
        }
      }
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) < 35) return;

      const now = performance.now();
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const cur = activeIndexRef.current;

      if (scrollY <= 80) {
        if (diff > 0) {
          // Swipe UP = Scroll DOWN
          if (cur < products.length - 1) {
            e.preventDefault();
            if (now - lastWheelTime > WHEEL_COOLDOWN) {
              lastWheelTime = now;
              touchStartY = touchEndY;
              goToProduct(cur + 1);
            }
          }
        } else {
          // Swipe DOWN = Scroll UP
          if (cur > 0) {
            e.preventDefault();
            if (now - lastWheelTime > WHEEL_COOLDOWN) {
              lastWheelTime = now;
              touchStartY = touchEndY;
              goToProduct(cur - 1);
            }
          }
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });

    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove, { capture: true });
    };
  }, [goToProduct]);

  // ── Smooth Circular Progress Countdown (0% to 100%, then advances to next product) ──
  useEffect(() => {
    let animFrame;
    const startTime = performance.now();
    setProgress(0);

    const tick = (now) => {
      const elapsed = now - startTime;
      const currentProg = Math.min(1, elapsed / AUTO_DURATION);
      setProgress(currentProg);

      if (currentProg >= 1) {
        // Complete circle is finished! Seamlessly switch to next product
        const cur = activeIndexRef.current;
        const nextIdx = (cur + 1) % products.length;
        goToProduct(nextIdx);
      } else {
        animFrame = requestAnimationFrame(tick);
      }
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [activeIndex, goToProduct]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section 
      ref={sectionRef} 
      className={styles.section} 
      id="notebook-showcase" 
      aria-label="Twofold Notebook Range Editorial Showcase"
    >
      <div className={styles.pinContainer} ref={pinContainerRef}>
        <div className={styles.fullBleedShowcase}>
        {/* ── LEFT: Full-Bleed Photography Spread (~55%) ── */}
        <div className={styles.visualSpread}>
          {products.map((p, idx) => {
            const isActive = idx === activeIndex;
            const isPast = idx < activeIndex;
            return (
              <div 
                key={p.id}
                className={`${styles.productSlide} ${
                  isActive 
                    ? styles.slideActive 
                    : isPast 
                      ? styles.slidePast 
                      : styles.slideFuture
                }`}
                aria-hidden={!isActive}
              >
                {/* Central Hero Product Image */}
                <div className={styles.mainImageContainer}>
                  <Image
                    src={p.mainImage}
                    alt={p.mainAlt}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className={styles.mainProductImg}
                  />
                </div>

                {/* Secondary Floating Art-Directed Images */}
                {p.secondaryImages.map((sec, sIdx) => (
                  <div 
                    key={sIdx} 
                    className={`${styles.floatingDetail} ${sec.className}`}
                    style={{ transitionDelay: isActive ? `${(sIdx + 1) * 0.08}s` : '0s' }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <Image
                        src={sec.src}
                        alt={sec.alt}
                        fill
                        sizes="180px"
                        className={styles.floatingDetailImg}
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* ── CENTER DIVIDER: Minimal Vertical Dot & Arrow Navigator ── */}
        <nav 
          className={styles.dividerNavigation} 
          aria-label="Notebook Range Product Navigator"
        >
          {/* Prominent Up Arrow with Long Stroke Line */}
          <button
            type="button"
            className={styles.arrowButton}
            onClick={handlePrev}
            aria-label="Previous notebook"
            title="Previous notebook"
          >
            <svg className={styles.arrowSvg} viewBox="0 0 20 20" fill="none">
              <path 
                d="M10 17V3M10 3L4 9M10 3L16 9" 
                stroke="currentColor" 
                strokeWidth="2.25" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </button>

          {/* 6 Circular Indicators with Real-Time Animated Progress Ring */}
          <div className={styles.navIndicators}>
            {products.map((p, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`${styles.navDot} ${isActive ? styles.navDotActive : ''}`}
                  onClick={() => goToProduct(idx)}
                  onMouseEnter={() => playHover?.()}
                  aria-label={`Select ${p.title}`}
                  aria-current={isActive ? 'true' : 'false'}
                >
                  {/* Circular Progress Countdown Ring on Active Dot */}
                  {isActive && (
                    <svg className={styles.progressRingSvg} viewBox="0 0 36 36">
                      <circle
                        className={styles.progressRingTrack}
                        cx="18"
                        cy="18"
                        r="14"
                      />
                      <circle
                        className={styles.progressRingFill}
                        cx="18"
                        cy="18"
                        r="14"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
                      />
                    </svg>
                  )}

                  <span className={styles.navDotCenter} />
                  <span className={styles.navTooltip}>
                    {p.id} — {p.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Prominent Down Arrow with Long Stroke Line */}
          <button
            type="button"
            className={styles.arrowButton}
            onClick={handleNext}
            aria-label="Next notebook"
            title="Next notebook"
          >
            <svg className={styles.arrowSvg} viewBox="0 0 20 20" fill="none">
              <path 
                d="M10 3V17M10 17L4 11M10 17L16 11" 
                stroke="currentColor" 
                strokeWidth="2.25" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </button>
        </nav>

        {/* ── RIGHT: Full-Bleed Editorial Information (~45%) ── */}
        <div className={styles.infoSpread}>
          {products.map((p, idx) => {
            const isActive = idx === activeIndex;
            const isPast = idx < activeIndex;
            return (
              <div 
                key={p.id}
                className={`${styles.textSlide} ${
                  isActive 
                    ? styles.textActive 
                    : isPast 
                      ? styles.textPast 
                      : styles.textFuture
                }`}
                aria-hidden={!isActive}
              >
                {/* Product Counter 01 / 06 */}
                <div className={styles.indexRow}>
                  <span className={styles.currentNumber}>{p.id}</span>
                  <span className={styles.slashDivider}>/</span>
                  <span className={styles.totalNumber}>06</span>
                </div>

                {/* Category Eyebrow */}
                <span className={styles.categoryTag}>{p.category}</span>

                {/* Display Headline */}
                <h1 className={styles.productHeading}>{p.title}</h1>

                {/* Short confirmed description */}
                <p className={styles.productDescription}>{p.desc}</p>

                {/* Single Consistent CTA Button (Official Site Button) */}
                <div className={styles.actionGroup}>
                  <Button
                    href={`/contact-us?product=${encodeURIComponent(p.title)}`}
                    variant="primary"
                    hasArrow
                    onClick={() => playClick?.()}
                  >
                    Request Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
}
