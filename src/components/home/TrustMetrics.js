import styles from './TrustMetrics.module.css';

export default function TrustMetrics() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Row of 4 stats separated by vertical lines */}
        <div className={styles.statsRow}>

          <div className={styles.stat}>
            <div className={styles.number}>10+</div>
            <div className={styles.unit}>Years</div>
            <div className={styles.desc}>hands-on manufacturing &amp; export experience</div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.stat}>
            <div className={styles.number}>1988</div>
            <div className={styles.unit}>Since</div>
            <div className={styles.desc}>three decades of family heritage in the paper trade</div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.stat}>
            <div className={styles.number}>AQL</div>
            <div className={styles.unit}>Quality</div>
            <div className={styles.desc}>every shipment inspected before dispatch</div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.stat}>
            <div className={styles.number}>JNPT</div>
            <div className={styles.unit}>Export</div>
            <div className={styles.desc}>shipped via Nhava Sheva, India's leading port</div>
          </div>

        </div>
      </div>
    </section>
  );
}
