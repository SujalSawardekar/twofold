'use client';

import { useState } from 'react';
import styles from './Accordion.module.css';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(index);
    }
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
            <button
              type="button"
              className={styles.trigger}
              onClick={() => handleToggle(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isOpen}
            >
              {item.question}
              <span className={styles.icon} aria-hidden="true">
                {isOpen ? (
                  <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 7H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_add)">
                      <path d="M7 0.540039V13.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M0.5 7H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_add">
                        <rect width="14" height="14" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </span>
            </button>
            <div className={styles.content} aria-hidden={!isOpen}>
              <div className={styles.answer}>{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
