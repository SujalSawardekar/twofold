'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Insights.module.css';

const ARTICLES = [
  {
    id: 'manufactured',
    category: 'Manufacturing',
    title: 'How Notebooks Are Manufactured: Inside Our Palghar Facility',
    excerpt: 'A comprehensive behind-the-scenes look at high-volume paper conversion, precision binding, and automated quality control.',
    date: 'Sep 02, 2026',
    img: '/images/editorial/facility.jpg',
    alt: 'Inside Palghar Notebook Manufacturing Facility',
    href: '/blog/how-notebooks-are-manufactured',
  },
  {
    id: 'binding',
    category: 'Sourcing Guide',
    title: 'Spiral vs Wire-O vs Stitched: Choosing the Right Notebook',
    date: 'Aug 28, 2026',
    img: '/images/editorial/notebook-detail.jpg',
    alt: 'Different notebook binding styles',
    href: '/blog/choosing-right-notebook',
  },
  {
    id: 'quality',
    category: 'Quality Control',
    title: 'What Is AQL 1.5, and Why It Matters in Bulk Stationery Imports',
    date: 'Aug 19, 2026',
    img: '/images/editorial/aql-inspection.jpg',
    alt: 'AQL quality inspection process',
    href: '/blog/what-is-aql',
  },
  {
    id: 'shipping',
    category: 'Export Logistics',
    title: 'Streamlining Container Exports from JNPT to Global Ports',
    date: 'Aug 10, 2026',
    img: '/images/editorial/serve-importers.jpg',
    alt: 'Shrink-wrapped pallets for container shipment',
    href: '/blog/container-exports-guide',
  },
  {
    id: 'paper',
    category: 'Sustainability',
    title: 'FSC-Certified Paper & Eco-Friendly Ink: Sustainable Stationery',
    date: 'Jul 29, 2026',
    img: '/images/editorial/hero-journal.jpg',
    alt: 'Sustainable FSC paper journal',
    href: '/blog/sustainable-stationery',
  },
];

export default function Insights() {
  const [featured, ...gridArticles] = ARTICLES;

  return (
    <section className={styles.section} id="insights">
      <div className={styles.inner}>

        {/* ── TOP HEADER ROW ── */}
        <div className={styles.topRow}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>LATEST INSIGHTS</span>
            <h2 className={styles.headline}>Latest Insights</h2>
            <p className={styles.subtext}>
              Stay informed! Explore our latest updates on paper manufacturing, export trends, and stationery insights.
            </p>
          </div>

          <Link href="/blog" className={styles.ctaBtn}>
            View All Blogs →
          </Link>
        </div>

        {/* ── ASYMMETRIC GRID: FEATURED LEFT + 2x2 GRID RIGHT ── */}
        <div className={styles.mainGrid}>

          {/* ── LEFT: LARGE FEATURED ARTICLE CARD ── */}
          <Link href={featured.href} className={styles.featuredCard}>
            <div className={styles.featuredImgWrapper}>
              <Image
                src={featured.img}
                alt={featured.alt}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className={styles.cardImg}
              />
              <span className={styles.categoryBadge}>{featured.category}</span>
            </div>

            <div className={styles.featuredContent}>
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
              <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              
              <div className={styles.dateMeta}>
                <svg className={styles.clockIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{featured.date}</span>
              </div>
            </div>
          </Link>

          {/* ── RIGHT: 2x2 GRID OF 4 SECONDARY ARTICLE CARDS ── */}
          <div className={styles.secondaryGrid}>
            {gridArticles.map((article) => (
              <Link key={article.id} href={article.href} className={styles.smallCard}>
                <div className={styles.smallImgWrapper}>
                  <Image
                    src={article.img}
                    alt={article.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 25vw"
                    className={styles.cardImg}
                  />
                  <span className={styles.categoryBadge}>{article.category}</span>
                </div>

                <div className={styles.smallContent}>
                  <h4 className={styles.smallTitle}>{article.title}</h4>
                  
                  <div className={styles.dateMeta}>
                    <svg className={styles.clockIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{article.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
