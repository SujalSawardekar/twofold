'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { useSound } from '@/providers/SoundEffectsProvider';
import styles from './ContactClosingCTA.module.css';

export default function ContactClosingCTA() {
  const { playClick } = useSound();

  const handleScrollToForm = (e) => {
    e.preventDefault();
    try {
      playClick?.();
    } catch {
      // safe fallback
    }

    const formEl = document.getElementById('enquiry');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
      // Focus first input after smooth scroll
      setTimeout(() => {
        const firstInput = formEl.querySelector('input, select, textarea');
        firstInput?.focus();
      }, 600);
    }
  };

  return (
    <section className={styles.section} aria-label="Closing Call to Action">
      <div className={styles.ambientGlow} />
      
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>GET STARTED / 05</span>
          
          <h2 className={styles.heading}>
            Ready to Discuss Your Requirements?
          </h2>
          
          <p className={styles.subtext}>
            Tell us what you&apos;re looking for. We&apos;ll take it from there.
          </p>

          <div className={styles.ctaWrapper}>
            <Button
              variant="primary"
              hasArrow
              onClick={handleScrollToForm}
              className={styles.ctaButton}
            >
              SEND ENQUIRY
            </Button>
          </div>

          <div className={styles.footerNote}>
            <span>DIRECT FACTORY SOURCING</span>
            <span className={styles.separator}>•</span>
            <span>CUSTOM SPECS</span>
            <span className={styles.separator}>•</span>
            <span>WORLDWIDE EXPORT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
