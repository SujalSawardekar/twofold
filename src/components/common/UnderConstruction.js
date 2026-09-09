'use client';

import Link from 'next/link';
import styles from './UnderConstruction.module.css';

export default function UnderConstruction({
  eyebrow = "Section In Curation",
  title = "We are Crafting Something Enduring.",
  description = "This dossier is currently being prepared with full technical specifications, photography, and case studies. For immediate procurement or tender requirements, please connect with our desk.",
  statusText = "In Production / Coming Soon",
  primaryCtaText = "Back to Home",
  primaryCtaLink = "/",
  secondaryCtaText = "Contact Export Desk",
  secondaryCtaLink = "/#footer"
}) {
  return (
    <section className={styles.container}>
      <div className={styles.backgroundGrid} />

      <div className={styles.card}>
        <div className={styles.statusPill}>
          <span className={styles.dot} />
          <span>{statusText}</span>
        </div>

        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <Link href={primaryCtaLink} className={styles.btnPrimary}>
            {primaryCtaText}
          </Link>
          <Link href={secondaryCtaLink} className={styles.btnSecondary}>
            {secondaryCtaText} →
          </Link>
        </div>
      </div>
    </section>
  );
}
