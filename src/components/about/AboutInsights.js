'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from './AboutInsights.module.css';

const INSIGHT_POSTS = [
  {
    category: 'MANUFACTURING',
    title: 'How Notebooks Are Manufactured: Inside Our Palghar Facility',
    excerpt: 'A comprehensive behind-the-scenes look at high-volume paper reel conversion, automated ruling lines, and precision binding.',
    image: '/images/editorial/facility.jpg',
    href: '/blog/how-notebooks-are-manufactured',
    date: 'Sep 2026',
  },
  {
    category: 'QUALITY CONTROL',
    title: 'What Is AQL 2.5, and Why It Matters in Bulk Stationery Imports',
    excerpt: 'Understanding sampling formulas, critical defect thresholds, and how pre-shipment quality standards protect overseas distributors.',
    image: '/images/editorial/aql-inspection.jpg',
    href: '/blog/what-is-aql',
    date: 'Aug 2026',
  },
  {
    category: 'EXPORT LOGISTICS',
    title: 'Streamlining Container Exports from JNPT to Global Ports',
    excerpt: 'Optimizing container load factors, palletization durability, and customs clearance procedures from Nhava Sheva.',
    image: '/images/editorial/serve-importers.jpg',
    href: '/blog/container-exports-guide',
    date: 'Aug 2026',
  },
];

export default function AboutInsights() {
  return (
    <section className={styles.section} id="insights" aria-label="Manufacturing and Export Insights">
      <div className={styles.inner}>

        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>MANUFACTURING &amp; EXPORT INSIGHTS</span>
            <h2 className={styles.headline}>
              Knowledge Built on the <em>Factory Floor.</em>
            </h2>
            <p className={styles.copy}>
              Behind-the-scenes perspectives on paper converting, export logistics, paper GSM testing,
              and international stationery procurement.
            </p>
          </div>

          <div style={{ flexShrink: 0 }}>
            <Button href="/blog" variant="primary" hasArrow>
              Explore All Insights
            </Button>
          </div>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className={styles.grid}>
          {INSIGHT_POSTS.map((post) => (
            <Link key={post.href} href={post.href} className={styles.card}>
              
              <div className={styles.imageWrap}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.cardImg}
                />
                <span className={styles.categoryBadge}>{post.category}</span>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.postDate}>{post.date}</span>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <span className={styles.readMore}>Read Article →</span>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
