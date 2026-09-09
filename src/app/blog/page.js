'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import ArticleCard from '@/components/ui/ArticleCard';

export default function BlogPage() {
  const articles = [
    {
      category: 'Manufacturing',
      title: 'How Notebooks Are Manufactured: Inside Our Palghar Facility',
      excerpt: 'A behind-the-scenes look at the precision and scale involved in bulk notebook production.',
      imageSrc: '/images/editorial/facility.jpg'
    },
    {
      category: 'Sourcing Guide',
      title: 'Spiral vs Double Wire vs Glue Bound: Choosing the Right Notebook for Your Market',
      excerpt: 'Understanding binding types to make informed decisions for your stationery distribution.',
      imageSrc: '/images/editorial/notebook-detail.jpg'
    },
    {
      category: 'Quality',
      title: 'What Is AQL, and Why It Matters When Sourcing Stationery in Bulk',
      excerpt: 'Learn about Acceptance Quality Level inspections and how they ensure reliable shipments.',
      imageSrc: '/images/editorial/aql-inspection.jpg'
    },
    {
      category: 'Export & Logistics',
      title: 'Exporting from India: A Practical Guide for International Stationery Importers',
      excerpt: 'Key considerations when sourcing and importing paper products from Indian manufacturers.',
      imageSrc: '/images/editorial/serve-importers.jpg'
    },
    {
      category: 'Sourcing Guide',
      title: "Sourcing Notebooks for Schools: A Buyer's Guide",
      excerpt: 'Essential factors to consider when ordering educational notebooks in large volumes.',
      imageSrc: '/images/editorial/serve-education.jpg'
    },
    {
      category: 'Export & Logistics',
      title: "Why Nhava Sheva (JNPT) Is India's Gateway for Paper Exports",
      excerpt: 'How strategic port access streamlines global shipping for stationery products.',
      imageSrc: '/images/editorial/hero-factory.jpg'
    },
    {
      category: 'Sustainability',
      title: 'Sustainable Paper Packaging: Trends Shaping the Stationery Industry',
      excerpt: 'Exploring eco-friendly materials and their growing importance in modern packaging.',
      imageSrc: '/images/editorial/hero-journal.jpg'
    },
    {
      category: 'Industry',
      title: 'Building Long-Term Supplier Partnerships in the Stationery Trade',
      excerpt: 'The benefits of choosing a reliable manufacturing partner for consistent growth.',
      imageSrc: '/images/editorial/serve-brands.jpg'
    }
  ];

  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <main>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <h1 className="h1">Insights From the World of Paper.</h1>
          <p className={styles.heroSubtitle}>
            Manufacturing knowledge, export guides, sourcing insights, and company updates.
          </p>
        </div>
      </section>

      <section className={styles.blogSection}>
        <div className="container">
          <div className={styles.featuredArticle}>
            <Link href="#" className={styles.featuredLink}>
              <div 
                className={styles.featuredImage}
                style={{
                  backgroundImage: `url(${featuredArticle.imageSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className={styles.featuredContent}>
                <div className={styles.featuredCategory}>{featuredArticle.category}</div>
                <h2 className={styles.featuredTitle}>{featuredArticle.title}</h2>
                <p className={styles.featuredExcerpt}>{featuredArticle.excerpt}</p>
              </div>
            </Link>
          </div>

          <div className={styles.articleGrid}>
            {gridArticles.map((article, index) => (
              <ArticleCard 
                key={index}
                category={article.category}
                title={article.title}
                excerpt={article.excerpt}
                imageSrc={article.imageSrc}
                href="#"
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.newsletterSection}>
        <div className={`container ${styles.newsletterContent}`}>
          <p className={styles.newsletterText}>
            Stay updated on manufacturing insights and export knowledge.
          </p>
          <div className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className={styles.newsletterInput} 
            />
            <button className={styles.newsletterBtn}>Subscribe</button>
          </div>
        </div>
      </section>
    </main>
  );
}
