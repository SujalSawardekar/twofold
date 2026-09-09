import React from 'react';
import styles from './ContactLocation.module.css';

export default function ContactLocation() {
  return (
    <section className={styles.section} aria-label="Manufacturing Facility Location">
      <div className={styles.container}>
        
        {/* Top Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.metaCol}>
            <span className={styles.eyebrow}>MANUFACTURING &amp; LOGISTICS / 02</span>
            <div className={styles.goldLine} />
          </div>
        </div>

        {/* Google Map View of Palghar Facility */}
        <div className={styles.gmapWrapper}>
          <div className={styles.gmapCard}>
            
            {/* Header Bar */}
            <div className={styles.gmapHeader}>
              <div className={styles.gmapTitle}>
                <span className={styles.radarDot} />
                <span>PALGHAR FACILITY (GMAP VIEW)</span>
              </div>
              <a
                href="https://maps.google.com/?q=Palghar,+Maharashtra,+India"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.gmapExternalLink}
                aria-label="Open Palghar location in Google Maps"
              >
                Open in Google Maps ↗
              </a>
            </div>

            {/* Responsive Google Maps Iframe */}
            <div className={styles.gmapFrame}>
              <iframe
                title="Twofold Palghar Facility Location Map"
                src="https://maps.google.com/maps?q=Palghar%2C%20Maharashtra%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className={styles.gmapIframe}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Bottom Specs Bar */}
            <div className={styles.gmapFooter}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>FACILITY REGION</span>
                <span className={styles.specVal}>Palghar Industrial Zone, Maharashtra</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>COORDINATES</span>
                <span className={styles.specVal}>19°41&apos;49&quot;N 72°45&apos;50&quot;E</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>TRANSIT ACCESS</span>
                <span className={styles.specVal}>NH-48 Corridor &amp; Western Rail</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
