'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './AboutFacility.module.css';

export default function AboutFacility() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const bottomBarRef = useRef(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    ScrollTrigger.refresh();

    // Subtle parallax on factory photograph
    gsap.to(imageRef.current, {
      scale: 1.05,
      yPercent: 4,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
      defaults: { ease: 'power3.out' },
    });

    tl.fromTo(
      `.${styles.headline}`,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    )
    .fromTo(
      contentRef.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.3'
    )
    .fromTo(
      `.${styles.imageFrame}`,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    )
    .fromTo(
      bottomBarRef.current?.children || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
      '-=0.2'
    );

  }, { scope: sectionRef });

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      id="manufacturing-facility"
      aria-label="Our Manufacturing Facility in Palghar"
    >
      <div className={styles.inner}>

        {/* ── MAIN CONTENT GRID ── */}
        <div className={styles.contentGrid}>

          {/* Left: Editorial Narrative */}
          <div className={styles.narrativeSide} ref={contentRef}>
            <span className={styles.eyebrow}>OUR MANUFACTURING FACILITY</span>
            <h2 className={styles.headline}>
              Manufacturing from Palghar.<br />
              <span className={styles.headlineItalic}>Built for consistent export.</span>
            </h2>

            <div className={styles.narrativeBody}>
              <p className={styles.leadStatement}>
                Our manufacturing facility is based in Palghar, Maharashtra — a recognised hub
                for notebook manufacturing in India.
              </p>
              <p className={styles.supportingText}>
                This single, integrated location gives us direct access to a skilled workforce,
                established raw-material supply chains, and the production capacity required to
                fulfil high-volume export orders reliably and on schedule.
              </p>
            </div>

            <div className={styles.clusterBadge}>
              <span className={styles.clusterDot} />
              <span>DIRECT FACTORY CONVERTING · NO TRADING INTERMEDIARIES</span>
            </div>
          </div>

          {/* Right: Architectural Framed Factory Image */}
          <div className={styles.imageSide}>
            <div className={styles.imageFrame}>
              <Image
                ref={imageRef}
                src="/images/editorial/hero-factory.jpg"
                alt="Twofold high-speed notebook converting lines and factory floor in Palghar, Maharashtra"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                priority={false}
                className={styles.facilityImg}
              />
              <div className={styles.imageTag}>
                <span>PALGHAR INTEGRATED PLANT</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM TECHNICAL REFERENCE BAR ── */}
        <div className={styles.bottomBar} ref={bottomBarRef}>
          <div className={styles.referenceCol}>
            <span className={styles.refNum}>01</span>
            <div className={styles.refInfo}>
              <span className={styles.refLabel}>MANUFACTURING HUB</span>
              <span className={styles.refVal}>Palghar Industrial Cluster, Maharashtra, India</span>
            </div>
          </div>

          <div className={styles.refDivider} />

          <div className={styles.referenceCol}>
            <span className={styles.refNum}>02</span>
            <div className={styles.refInfo}>
              <span className={styles.refLabel}>LOGISTICS CORRIDOR</span>
              <span className={styles.refVal}>Direct 95 km Highway Access to Nhava Sheva (JNPT) Port</span>
            </div>
          </div>

          <div className={styles.refDivider} />

          <div className={styles.referenceCol}>
            <span className={styles.refNum}>03</span>
            <div className={styles.refInfo}>
              <span className={styles.refLabel}>CONVERTING CAPACITY</span>
              <span className={styles.refVal}>Continuous High-Volume Reel-to-Notebook Converting</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
