'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './AboutStory.module.css';

export default function AboutStory() {
  const sectionRef = useRef(null);
  const bannerRef = useRef(null);
  const columnsRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
      defaults: { ease: 'power3.out' },
    });

    tl.fromTo(
      `.${styles.header}`,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    )
    .fromTo(
      bannerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.3'
    )
    .fromTo(
      columnsRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 },
      '-=0.4'
    )
    .fromTo(
      statsRef.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.3'
    );

  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef} id="our-story" aria-label="Our Story and Values">
      <div className={styles.inner}>

        {/* ── TOP HEADER ROW (Matching Reference) ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrowTag}>HERITAGE &amp; FOUNDATION</span>
            <h2 className={styles.headline}>
              Our Story, Vision,<br />
              and Values
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.headerSubtext}>
              Operating from Palghar, Maharashtra — Three decades of paper trade heritage
              shapes our commitment to craftsmanship, precision, and the principles that guide our export operations every day.
            </p>
          </div>
        </div>

        {/* ── HERO BANNER ── */}
        <div className={styles.bannerContainer} ref={bannerRef}>
          <div className={styles.bannerFrame}>
            <Image
              src="/images/editorial/story-spiral.jpg"
              alt="Twofold modern paper stationery converting facility in Palghar Maharashtra"
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1320px"
              className={styles.bannerImage}
            />
          </div>
        </div>

        {/* ── TWO-COLUMN ASYMMETRIC STORY GRID ── */}
        <div className={styles.columnsGrid} ref={columnsRef}>

          {/* Left Column: Quote + Lead Text + Vortex Pill Card */}
          <div className={styles.leftCol}>
            <div className={styles.quoteMark} aria-hidden="true">
              “
            </div>
            <p className={styles.quoteParagraph}>
              Operating from Palghar, Maharashtra, Twofold brings over a decade of
              hands-on experience manufacturing and exporting paper stationery to
              international markets. Our connection to the paper trade runs deeper still
              — three decades, in fact — through a family history in the paper trade since 1988.
            </p>

            <div className={styles.vortexPillFrame}>
              <Image
                src="/images/editorial/paper-vortex.jpg"
                alt="Twofold precision paper layer curves and notebook converting detail"
                fill
                sizes="(max-width: 900px) 100vw, 560px"
                className={styles.vortexImg}
              />
              <div className={styles.pillOverlayTag}>
                <span>PALGHAR HERITAGE ARCHIVE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Deep Royal Blue Brand Card */}
          <div className={styles.rightCol}>
            <div className={styles.blueCard}>
              <div className={styles.blueCardHeader}>
                <span className={styles.aboutUsBadge}>ABOUT US</span>
                <div className={styles.flowerIcon} aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <div className={styles.blueCardBody}>
                <p className={styles.blueCardLead}>
                  That heritage shapes the way we manufacture, ship and build relationships today:
                  built on <strong>trust</strong>, <strong>timeliness</strong> and <strong>consistency</strong>.
                </p>
                <p className={styles.blueCardParagraph}>
                  We believe in direct manufacturing integrity without intermediaries. By partnering closely with international stationery importers, wholesalers, chain stores, and distributors, we tailor bookbinding, substrate ruling, and container packaging to exact overseas market standards.
                </p>
                <p className={styles.blueCardParagraph}>
                  Our single, integrated Palghar facility gives us direct access to a skilled workforce, established paper mill supply chains, and the high-volume capacity required to fulfill recurring export orders reliably and on schedule.
                </p>
              </div>

              <div className={styles.blueCardFooter}>
                <span className={styles.blueCardSub}>ESTABLISHED 1988 · PALGHAR CLUSTER · JNPT PORT DIRECT</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM STATS STRIP CONTAINER ── */}
        <div className={styles.statsContainer} ref={statsRef}>
          <div className={styles.statSegment}>
            <span className={styles.statBigNum}>10+</span>
            <div className={styles.statLabelBlock}>
              <span className={styles.statTitle}>Years Manufacturing</span>
              <span className={styles.statSub}>Hands-On Export Experience</span>
            </div>
          </div>

          <div className={styles.statDivider} />

          <div className={styles.statSegment}>
            <span className={styles.statBigNum}>1988</span>
            <div className={styles.statLabelBlock}>
              <span className={styles.statTitle}>Paper Trade Roots</span>
              <span className={styles.statSub}>Three Decades Family Heritage</span>
            </div>
          </div>

          <div className={styles.statDivider} />

          <div className={styles.statSegment}>
            <span className={styles.statBigNum}>100%</span>
            <div className={styles.statLabelBlock}>
              <span className={styles.statTitle}>Direct Factory</span>
              <span className={styles.statSub}>No Trading Middlemen</span>
            </div>
          </div>

          <div className={styles.statDivider} />

          <div className={styles.statSegment}>
            <span className={styles.statBigNum}>5</span>
            <div className={styles.statLabelBlock}>
              <span className={styles.statTitle}>Global Regions</span>
              <span className={styles.statSub}>Direct JNPT Container Transit</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
