'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from './AboutCTA.module.css';

export default function AboutCTA() {
  return (
    <section className={styles.section} id="cta" aria-label="Partner With Twofold">
      <div className={styles.inner}>

        <div className={styles.ctaBox}>
          
          <span className={styles.eyebrow}>GET IN TOUCH</span>

          <h2 className={styles.headline}>
            Built for the order.<br />
            <em>Ready for the world.</em>
          </h2>

          <p className={styles.copy}>
            Explore the Twofold product range or speak with our export team
            about your next notebook or stationery consignment.
          </p>

          <div className={styles.btnRow}>
            <Button href="/products" variant="white" size="large" hasArrow>
              Learn About Our Products
            </Button>

            <Button href="/contact-us" variant="outline-white" size="large">
              Get in Touch
            </Button>
          </div>

          <div className={styles.footerDetails}>
            <span>PALGHAR CONVERTING PLANT · MH, INDIA</span>
            <span className={styles.detailDot}>·</span>
            <span>CONTAINER-LOAD EXPORT TO 5 REGIONS</span>
          </div>

        </div>

      </div>
    </section>
  );
}
