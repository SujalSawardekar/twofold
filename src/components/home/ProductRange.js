import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductRange.module.css';

export default function ProductRange() {
  const products = [
    { index: '01', name: 'Exercise Books',         span: 'tall',   image: '/images/products/exercise-book.jpg' },
    { index: '02', name: 'Spiral Bound',           span: 'normal', image: '/images/products/spiral-bound.jpg' },
    { index: '03', name: 'Double Wire Bound',      span: 'normal', image: '/images/products/wiro-bound.jpg' },
    { index: '04', name: 'Hard Cover Gally Bound', span: 'wide',   image: '/images/products/hardcover.jpg' },
    { index: '05', name: 'Centre Stitched',        span: 'normal', image: '/images/products/centre-stitched.jpg' },
    { index: '06', name: 'Glue Bound',             span: 'normal', image: '/images/products/perfect-bound.jpg' },
  ];

  return (
    <section className={styles.section} id="products">
      <div className={styles.inner}>

        {/* Sticky header column + masonry gallery */}
        <div className={styles.layout}>

          {/* Left: sticky header */}
          <div className={styles.sidebar}>
            <span className={styles.eyebrow}>Product Range</span>
            <h2 className={styles.headline}>
              Paper Products.<br />
              Built for Every<br />
              Market.
            </h2>
            <p className={styles.copy}>
              Exercise books, spiral bound, double wire bound, hard cover Gally 
              bound, centre stitched, and glue bound — manufactured for 
              high-volume global markets.
            </p>
            <Link href="/products" className={styles.cta}>
              View All Products →
            </Link>
          </div>

          {/* Right: product gallery */}
          <div className={styles.gallery}>
            {products.map((p) => (
              <Link key={p.index} href="/products" className={`${styles.item} ${styles[p.span]}`}>
                <div className={styles.imageWrap}>
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.productImg}
                  />
                </div>
                <div className={styles.itemMeta}>
                  <span className={styles.itemIdx}>{p.index}</span>
                  <span className={styles.itemName}>{p.name}</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
