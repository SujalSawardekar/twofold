import Button from './Button';
import SectionLabel from './SectionLabel';
import styles from './CTASection.module.css';

export default function CTASection({
  label,
  heading,
  description,
  primaryCTA,
  secondaryCTA,
}) {
  return (
    <section className={styles.section}>
      <div className="container">
        {label && <SectionLabel className="light">{label}</SectionLabel>}
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        {description && <p className={styles.description}>{description}</p>}
        
        <div className={styles.actions}>
          {primaryCTA && (
            <Button
              variant="primary"
              size="large"
              href={primaryCTA.href}
              hasArrow
            >
              {primaryCTA.text}
            </Button>
          )}
          {secondaryCTA && (
            <Button
              variant="outline"
              size="large"
              href={secondaryCTA.href}
              className="light"
            >
              {secondaryCTA.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
