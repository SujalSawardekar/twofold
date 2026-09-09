'use client';

import { useSound } from '@/providers/SoundEffectsProvider';
import styles from './SoundToggle.module.css';

export default function SoundToggle() {
  const { isMuted, toggleSound } = useSound();

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={`${styles.toggleBtn} ${isMuted ? styles.muted : styles.active}`}
        onClick={toggleSound}
        aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
        aria-pressed={!isMuted}
        title={isMuted ? 'Sound: Muted (Click to enable)' : 'Sound: Enabled (Click to mute)'}
        suppressHydrationWarning
      >
        {isMuted ? (
          /* Muted Speaker Icon with Diagonal Strike */
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          /* Active Speaker with Sound Waves */
          <div className={styles.activeIconWrap}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            <div className={styles.equalizer} aria-hidden="true">
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </div>
          </div>
        )}
        <span className={styles.label}>
          {isMuted ? 'MUTED' : 'AUDIO'}
        </span>
      </button>
    </div>
  );
}
