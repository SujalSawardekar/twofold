import SectionLabel from './SectionLabel';
import styles from './SectionHeading.module.css';

export default function SectionHeading({
  label,
  heading,
  description,
  theme = 'dark',
  className = '',
  headingLevel = 'h2',
}) {
  const HeadingTag = headingLevel;

  return (
    <div className={`${styles.wrapper} ${styles[theme] || ''} ${className}`.trim()}>
      {label && <SectionLabel>{label}</SectionLabel>}
      {heading && (
        <HeadingTag 
          className={styles.heading}
          dangerouslySetInnerHTML={{ __html: heading }}
        />
      )}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
