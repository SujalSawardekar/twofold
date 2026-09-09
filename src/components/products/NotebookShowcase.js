'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
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

const AUTO_DURATION = 4500; // 4.5 seconds per product auto-cycle
const CIRCUMFERENCE = 2 * Math.PI * 14; // ~87.96

export default function NotebookShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const activeIndexRef = useRef(0);
  const scrollWrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const isUserScrollingRef = useRef(false);
  const userScrollTimeoutRef = useRef(null);
  const isHoveredRef = useRef(false);

  const { playClick, playSlide, playHover } = useSound();

  // Synchronize state ref
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Navigate to product with instant zero-lag state update + scroll alignment
  const goToProduct = useCallback((index, isAuto = false) => {
    if (index < 0 || index >= products.length) return;
    setActiveIndex(index);
    activeIndexRef.current = index;
    setProgress(0);
    try {
      playSlide?.();
    } catch {
      // safe fallback
    }

    if (triggerRef.current) {
      const start = triggerRef.current.start;
      const end = triggerRef.current.end;
      const totalProducts = products.length;
      const targetProgress = (index + 0.5) / totalProducts;
      const targetY = start + targetProgress * (end - start);

      if (typeof window !== 'undefined') {
        if (window.lenis) {
          window.lenis.scrollTo(targetY, { duration: isAuto ? 1.0 : 0.5, lock: false });
        } else {
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }
    }
  }, [playSlide]);

  const handleNext = useCallback(() => {
    const nextIdx = (activeIndexRef.current + 1) % products.length;
    goToProduct(nextIdx);
  }, [goToProduct]);

  const handlePrev = useCallback(() => {
    const prevIdx = (activeIndexRef.current - 1 + products.length) % products.length;
    goToProduct(prevIdx);
  }, [goToProduct]);

  // Track active user scrolling (wheel or touch)
  useEffect(() => {
    const handleUserScroll = () => {
      isUserScrollingRef.current = true;
      clearTimeout(userScrollTimeoutRef.current);
      userScrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 1200);
    };

    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchmove', handleUserScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
      clearTimeout(userScrollTimeoutRef.current);
    };
  }, []);

  // ── GSAP ScrollTrigger: Sticky Pinning + Scroll to Footer at the end ──
  useGSAP(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    const totalProducts = products.length;
    const scrollDistance = totalProducts * 600;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: true,
      anticipatePin: 1,
      scrub: 0.3,
      onUpdate: (self) => {
        // Only drive product changes from scroll if user is actively scrolling
        if (isUserScrollingRef.current) {
          const p = self.progress;
          const targetIndex = Math.min(
            totalProducts - 1,
            Math.max(0, Math.floor(p * totalProducts))
          );

          if (targetIndex !== activeIndexRef.current) {
            activeIndexRef.current = targetIndex;
            setActiveIndex(targetIndex);
            setProgress(0);
            try {
              playSlide?.();
            } catch {
              // safe fallback
            }
          } else {
            // Update circular progress ring to reflect scroll progress inside current slice
            const sliceProg = (p * totalProducts) % 1;
            setProgress(sliceProg);
          }
        }
      },
    });

    triggerRef.current = st;

    return () => {
      st.kill();
    };
  }, [playSlide]);

  // ── Auto-Advance Countdown (Runs continuously when user is not manually scrolling or hovering) ──
  useEffect(() => {
    let animFrame;
    let lastTime = performance.now();

    const tick = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!isHoveredRef.current && !isUserScrollingRef.current) {
        setProgress((prev) => {
          const nextVal = prev + delta / AUTO_DURATION;
          if (nextVal >= 1) {
            const nextIdx = (activeIndexRef.current + 1) % products.length;
            goToProduct(nextIdx, true);
            return 0;
          }
          return nextVal;
        });
      }

      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [goToProduct]);

  // Keyboard navigation
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
    <div 
      ref={scrollWrapperRef} 
      className={styles.scrollWrapper}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      aria-label="Twofold Notebook Range Editorial Showcase"
    >
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
  );
}
