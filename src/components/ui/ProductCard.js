import Link from 'next/link';
import styles from './ProductCard.module.css';

export default function ProductCard({ index, name, description, imageSrc, href }) {
  const paddedIndex = String(index).padStart(2, '0');

  const content = (
    <>
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={name} className={styles.image} loading="lazy" />
      </div>
      <div className={styles.content}>
        <div className={styles.productIndex}>{paddedIndex}</div>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productDescription}>{description}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles.card}>
        {content}
      </Link>
    );
  }

  return <div className={styles.card}>{content}</div>;
}
