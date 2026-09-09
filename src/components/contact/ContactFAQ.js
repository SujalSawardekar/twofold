'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useSound } from '@/providers/SoundEffectsProvider';
import styles from './ContactFAQ.module.css';

const FAQ_ITEMS = [
  {
    id: '01',
    question: 'What is your minimum order quantity (MOQ)?',
    answer: 'Minimum order quantities vary based on notebook binding format, cover treatment, and export destination. Contact our export desk to discuss tailored MOQ thresholds for your specific sourcing requirements.'
  },
  {
    id: '02',
    question: 'Do you provide samples before a bulk order?',
    answer: 'Yes, sample evaluation is an integral part of our export partnership. We provide production-grade finish dummies and material samples for commercial review prior to full production dispatch.'
  },
  {
    id: '03',
    question: 'What are your typical production and shipping lead times?',
    answer: 'Production lead times depend on batch volume, custom ruling patterns, and cover finishing. Dispatch schedules from JNPT port (Mumbai) are confirmed upon order finalisation.'
  },
  {
    id: '04',
    question: 'What payment terms do you accept?',
    answer: 'We accommodate standard international commercial payment terms for institutional and export orders. Specific payment instruments can be confirmed with our trade desk.'
  },
  {
    id: '05',
    question: 'Do you ship on FOB, CIF, or other Incoterms?',
    answer: 'Yes, we export under globally recognized Incoterms including FOB (JNPT Port, Mumbai), CIF, and CFR, structured to match your destination port and freight preferences.'
  }
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default for immediate visual engagement
  const { playClick, playHover } = useSound();

  const handleToggle = useCallback((index) => {
    try {
      playClick?.();
    } catch {
      // safe fallback
    }
    setOpenIndex((prev) => (prev === index ? null : index));
  }, [playClick]);

  return (
    <section 
      className={styles.section} 
      aria-label="Frequently Asked Questions"
    >
      <div className={styles.container}>
        <div className={styles.layout}>

          {/* ── Left Column: Editorial Heading ── */}
          <div className={styles.headerCol}>
            <span className={styles.eyebrow}>COMMON QUESTIONS / BEFORE WE BEGIN</span>
            <h2 className={styles.displayHeading}>
              Common<br />
              <span className={styles.headingBreak}>Questions.</span>
            </h2>
            <p className={styles.subtext}>
              Key export, volume, and manufacturing details for international distributors, wholesalers, and stationery brands sourcing from India.
            </p>
            <div className={styles.directContactPrompt}>
              Have a custom specification or private label inquiry?{' '}
              <a href="#enquiry" className={styles.directLink}>
                Send us a direct enquiry above
              </a>
              .
            </div>
          </div>

          {/* ── Right Column: Spacious Hairline FAQ Rows ── */}
          <div className={styles.faqList} role="region" aria-label="Question List">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const rowId = `faq-row-${item.id}`;
              const answerId = `faq-answer-${item.id}`;

              return (
                <div 
                  key={item.id} 
                  className={`${styles.faqRow} ${isOpen ? styles.faqRowActive : ''}`}
                >
                  <button
                    type="button"
                    className={styles.trigger}
                    onClick={() => handleToggle(index)}
                    onMouseEnter={() => playHover?.()}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    id={rowId}
                  >
                    <div className={styles.questionContent}>
                      <span className={styles.indexNumber}>{item.id}</span>
                      <h3 className={styles.questionText}>{item.question}</h3>
                    </div>

                    <div className={styles.toggleIndicator} aria-hidden="true">
                      <span className={styles.iconLineHorizontal} />
                      <span className={styles.iconLineVertical} />
                    </div>
                  </button>

                  <div 
                    id={answerId}
                    role="region"
                    aria-labelledby={rowId}
                    className={`${styles.answerCollapse} ${isOpen ? styles.answerCollapseOpen : ''}`}
                  >
                    <div className={styles.answerInner}>
                      <div className={styles.answerBody}>
                        <p className={styles.answerText}>{item.answer}</p>
                      </div>
                    </div>
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
