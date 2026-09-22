'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './AboutVision.module.css';

export default function AboutVision() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const word1Ref = useRef(null);
  const word2Ref = useRef(null);
  const word3Ref = useRef(null);
  const cardRef = useRef(null);
  const imageCutoutRef = useRef(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // ── PINNED VISION SCROLL INTERACTION (twofold.com motion principle) ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    // Words travel smoothly into viewport within bounds
    tl.fromTo(
      word1Ref.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out', duration: 1 }
    )
    .fromTo(
      word2Ref.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out', duration: 1 },
      '-=0.5'
    )
    .fromTo(
      word3Ref.current,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out', duration: 1 },
      '-=0.5'
    )
    .fromTo(
      imageCutoutRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'power3.out', duration: 1.2 },
      '-=0.6'
    )
    .to({}, { duration: 0.6 })
    // Vision card content reveals at bottom
    .fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power3.out', duration: 1 },
      '-=0.2'
    );
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef} id="vision" aria-label="Our Vision">
      <div className={styles.pinnedViewport} ref={containerRef}>
        <div className={styles.inner}>

          {/* Top Eyebrow */}
          <div className={styles.headerTop}>
            <span className={styles.eyebrow}>OUR VISION</span>
            <span className={styles.subTag}>LONG-TERM VALUE CREATION</span>
          </div>

          {/* Large Kinetic Typography Layers */}
          <div className={styles.kineticStage}>
            
            <div className={styles.kineticLine1} ref={word1Ref}>
              <span className={styles.kineticWord}>DEPENDABLE</span>
            </div>

            <div className={styles.kineticLine2} ref={word2Ref}>
              <span className={styles.kineticWordOutline}>MANUFACTURE</span>
            </div>

            <div className={styles.kineticLine3} ref={word3Ref}>
              <span className={styles.kineticWordGold}>GLOBAL VALUE.</span>
            </div>

            {/* Asymmetric Floating Product Specimen */}
            <div className={styles.specimenFrame} ref={imageCutoutRef}>
              <Image
                src="/images/editorial/serve-brands.jpg"
                alt="Twofold precision-crafted notebooks for international stationery brands"
                fill
                sizes="(max-width: 900px) 260px, 380px"
                className={styles.specimenImg}
              />
              <div className={styles.specimenTag}>EXPORT SPECIFICATION</div>
            </div>

          </div>

          {/* Vision Statement Narrative */}
          <div className={styles.narrativeCard} ref={cardRef}>
            <p className={styles.visionText}>
              Twofold aims to be recognised globally as a genuine manufacturer of stationery
              items, creating dependable products and long-term value for importers,
              distributors and wholesalers.
            </p>

            <div className={styles.valueRow}>
              <div className={styles.valueItem}>
                <span className={styles.valueKey}>IMPORTERS</span>
                <span className={styles.valueDesc}>FCL volume pricing &amp; container optimization</span>
              </div>
              <div className={styles.valueItem}>
                <span className={styles.valueKey}>DISTRIBUTORS</span>
                <span className={styles.valueDesc}>Predictable lead times &amp; repeat batch fidelity</span>
              </div>
              <div className={styles.valueItem}>
                <span className={styles.valueKey}>WHOLESALERS</span>
                <span className={styles.valueDesc}>Retail-ready packaging &amp; customized bindings</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
