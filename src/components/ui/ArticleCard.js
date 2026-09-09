import Link from 'next/link';
import styles from './ArticleCard.module.css';

export default function ArticleCard({ category, title, excerpt, imageSrc, href = '#' }) {
  const hasValidImage = typeof imageSrc === 'string' && imageSrc.trim() !== '';

  return (
    <Link href={href} className={styles.card}>
      {hasValidImage && (
        <div className={styles.imageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt={title} className={styles.image} loading="lazy" />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.readMore}>
          Read
          <svg className={styles.arrow} width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_arrow_art)">
              <path d="M0.5 7H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 10.5L13.5 7L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_arrow_art">
                <rect width="14" height="14" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </Link>
  );
}
