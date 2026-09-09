'use client';

import React from 'react';
import { useSound } from '@/providers/SoundEffectsProvider';
import styles from './ContactSocial.module.css';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    handle: '@twofoldstationery',
    href: 'https://instagram.com',
    category: 'Visual Showcase'
  },
  {
    name: 'LinkedIn',
    handle: 'Twofold Paper Industries',
    href: 'https://linkedin.com',
    category: 'B2B & Corporate'
  },
  {
    name: 'Facebook',
    handle: 'Twofold Manufacturing',
    href: 'https://facebook.com',
    category: 'Community'
  },
  {
    name: 'Pinterest',
    handle: 'twofoldstationery',
    href: 'https://pinterest.com',
    category: 'Design & Finishes'
  }
];

export default function ContactSocial() {
  const { playHover, playClick } = useSound();

  return (
    <section className={styles.section} aria-label="Social Channels">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>FOLLOW TWOFOLD / 03</span>
        </div>

        <div className={styles.socialList}>
          {SOCIAL_LINKS.map((item, idx) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialRow}
              onMouseEnter={() => playHover?.()}
              onClick={() => playClick?.()}
              id={`social-link-${item.name.toLowerCase()}`}
            >
              <div className={styles.metaLeft}>
                <span className={styles.index}>0{idx + 1}</span>
                <span className={styles.platformName}>{item.name}</span>
                <span className={styles.categoryBadge}>{item.category}</span>
              </div>
              
              <div className={styles.metaRight}>
                <span className={styles.handle}>{item.handle}</span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
