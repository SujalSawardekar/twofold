'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

const CATEGORIES = [
  'All Articles',
  'Manufacturing',
  'Export & Logistics',
  'Quality Control',
  'Sourcing Guides',
  'Sustainability',
];

const FEATURED_ARTICLE = {
  id: 'feat-1',
  tag: 'MANUFACTURING INSIGHT',
  category: 'Manufacturing',
  title: 'How High-Volume Notebooks Are Manufactured: Inside Our Palghar Converting Facility',
  excerpt: 'From continuous reel-fed flexographic ruling and sub-millimeter cross-cutting to synchronized wire binding and moisture-barrier export bundling — an in-depth breakdown of container-scale stationery production.',
  image: '/images/editorial/palghar-converting-facility.jpg',
  author: 'Twofold Technical Operations',
};

const CAROUSEL_ARTICLES = [
  {
    id: 'c-1',
    tag: 'PRESS RELEASE',
    category: 'Manufacturing',
    title: 'Twofold Expands Automated Converting Lines to Meet Global Export Demand Across 15+ Countries',
    image: '/images/editorial/facility.jpg',
  },
  {
    id: 'c-2',
    tag: 'SOURCING GUIDE',
    category: 'Sourcing Guides',
    title: 'Spiral vs. Double Wire vs. Glue Bound: Choosing the Right Format for Your Distribution Channel',
    image: '/images/editorial/notebook-detail.jpg',
  },
  {
    id: 'c-3',
    tag: 'QUALITY COMPLIANCE',
    category: 'Quality Control',
    title: 'Understanding AQL 2.5 Sampling: How Pre-Dispatch Testing Eliminates Defect Risks for Importers',
    image: '/images/editorial/aql-inspection.jpg',
  },
  {
    id: 'c-4',
    tag: 'EXPORT LOGISTICS',
    category: 'Export & Logistics',
    title: 'JNPT Seaport Gateway: Optimizing Transit Schedules for Full Container Load (FCL) Stationery Shipments',
    image: '/images/editorial/hero-factory.jpg',
  },
  {
    id: 'c-5',
    tag: 'SUSTAINABILITY',
    category: 'Sustainability',
    title: 'FSC®-Certified Paper Substrates: Navigating Global Environmental Compliance in Modern Stationery',
    image: '/images/editorial/paper-vortex.jpg',
  },
  {
    id: 'c-6',
    tag: 'MARKET INTELLIGENCE',
    category: 'Manufacturing',
    title: 'Building Long-Term OEM Stationery Partnerships: Factory Direct vs. Intermediary Procurement',
    image: '/images/editorial/serve-brands.jpg',
  },
];

const ALL_ARTICLES = [
  {
    id: 'a-1',
    category: 'Manufacturing',
    tag: 'PRODUCTION INSIGHT',
    title: 'How Notebooks Are Manufactured: Inside Our Palghar Facility',
    excerpt: 'A behind-the-scenes look at the precision, automation, and scale involved in bulk notebook production.',
    image: '/images/editorial/facility.jpg',
  },
  {
    id: 'a-2',
    category: 'Sourcing Guides',
    tag: 'FORMAT COMPARISON',
    title: 'Spiral vs Double Wire vs Glue Bound: Choosing the Right Notebook for Your Market',
    excerpt: 'Understanding binding durability, flat-lay mechanics, and pricing brackets for commercial stationery procurement.',
    image: '/images/editorial/notebook-detail.jpg',
  },
  {
    id: 'a-3',
    category: 'Quality Control',
    tag: 'AUDIT PROTOCOLS',
    title: 'What Is AQL, and Why It Matters When Sourcing Stationery in Bulk',
    excerpt: 'Learn how Acceptance Quality Level (AQL 2.5) sampling ensures zero surprises before container sealing.',
    image: '/images/editorial/aql-inspection.jpg',
  },
  {
    id: 'a-4',
    category: 'Export & Logistics',
    tag: 'SEAPORT DISPATCH',
    title: 'Exporting from India: A Practical Guide for International Stationery Importers',
    excerpt: 'Key considerations on customs clearance, palletization, and Nhava Sheva (JNPT) container logistics.',
    image: '/images/editorial/serve-importers.jpg',
  },
  {
    id: 'a-5',
    category: 'Sourcing Guides',
    tag: 'EDUCATIONAL TENDERS',
    title: "Sourcing Exercise Books for Schools: A Wholesaler's Technical Guide",
    excerpt: 'Essential factors from ruling alignment to 54-80 GSM burst factor required for large educational programs.',
    image: '/images/editorial/serve-education.jpg',
  },
  {
    id: 'a-6',
    category: 'Export & Logistics',
    tag: 'LOGISTICS STRATEGY',
    title: "Why Nhava Sheva (JNPT) Is India's Premier Gateway for Paper Stationery Exports",
    excerpt: 'How 90-minute proximity to JNPT port cuts factory-to-vessel lead times and lowers container dwell periods.',
    image: '/images/editorial/hero-factory.jpg',
  },
  {
    id: 'a-7',
    category: 'Sustainability',
    tag: 'ECO INNOVATION',
    title: 'Sustainable Paper Packaging: Industry Trends Shaping Export Cartons & Wraps',
    excerpt: 'Exploring biodegradable moisture barriers, water-based inks, and recycled corrugated export packaging.',
    image: '/images/editorial/hero-journal.jpg',
  },
  {
    id: 'a-8',
    category: 'Manufacturing',
    tag: 'SUPPLY CHAIN',
    title: 'Building Long-Term Supplier Partnerships in the Global Stationery Trade',
    excerpt: 'Why vertical manufacturing integration and direct paper mill heritage deliver price predictability.',
    image: '/images/editorial/serve-brands.jpg',
  },
  {
    id: 'a-9',
    category: 'Sourcing Guides',
    tag: 'PRODUCT SPECIFICATION',
    title: 'Grammage, Opacity & Bulk: A Buyer’s Guide to Specifying Woodfree Papers',
    excerpt: 'How to calculate optimal paper weights to balance fountain-pen ink bleed with freight efficiency.',
    image: '/images/editorial/story-spiral.jpg',
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [subscribed, setSubscribed] = useState(false);
  const carouselRef = useRef(null);

  const filteredArticles = selectedCategory === 'All Articles'
    ? ALL_ARTICLES
    : ALL_ARTICLES.filter(a => a.category === selectedCategory);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <main className={styles.pageWrap}>
      
      {/* ── 1. Editorial Masthead ── */}
      <section className={styles.masthead}>
        <div className={styles.container}>
          <h1 className={styles.mastheadTitle}>
            Insights From the World of Paper &amp; Manufacturing.
          </h1>
          <p className={styles.mastheadSubtitle}>
            Technical manufacturing guides, export logistics reports, substrate specifications,
            and strategic procurement insights from our Palghar converting facility.
          </p>
        </div>
      </section>

      {/* ── 2. Top Main Featured Hero Blog Post ── */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.featuredCard}>
            
            {/* Visual Column */}
            <div className={styles.featuredVisualWrap}>
              <Image
                src={FEATURED_ARTICLE.image}
                alt={FEATURED_ARTICLE.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={styles.featuredImage}
              />
              <div className={styles.featuredImageOverlay} />
              <div className={styles.featuredBadgeFloating}>
                <span className={styles.badgeDot} />
                <span>FEATURED PUBLICATION</span>
              </div>
            </div>

            {/* Editorial Content Column */}
            <div className={styles.featuredContentWrap}>
              <div className={styles.featuredMetaRow}>
                <span className={styles.featuredTag}>{FEATURED_ARTICLE.tag}</span>
              </div>

              <h2 className={styles.featuredHeadline}>
                <Link href="#carousel-section" className={styles.featuredHeadlineLink}>
                  {FEATURED_ARTICLE.title}
                </Link>
              </h2>

              <p className={styles.featuredExcerpt}>
                {FEATURED_ARTICLE.excerpt}
              </p>

              <div className={styles.featuredFooter}>
                <div className={styles.authorBadge}>
                  <div className={styles.authorAvatar}>TF</div>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{FEATURED_ARTICLE.author}</span>
                    <span className={styles.authorRole}>Palghar Converting Division</span>
                  </div>
                </div>

                <Button
                  href="#carousel-section"
                  variant="primary"
                  size="small"
                  hasArrow
                >
                  Explore Guide
                </Button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Latest News & Publications Carousel (Matching Reference Screenshot) ── */}
      <section className={styles.carouselSection} id="carousel-section">
        <div className={styles.container}>
          
          {/* Header Row: Title + "VIEW ALL" + Arrow Buttons */}
          <div className={styles.carouselHeaderRow}>
            <div className={styles.carouselTitleGroup}>
              <h2 className={styles.carouselTitle}>Latest Publications</h2>
              <Link href="#all-articles" className={styles.viewAllLink}>
                <span>VIEW ALL</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="7" x2="12" y2="7" />
                  <polyline points="7 2 12 7 7 12" />
                </svg>
              </Link>
            </div>

            {/* Interactive Carousel Nav Arrows */}
            <div className={styles.carouselNavControls}>
              <button
                type="button"
                className={styles.carouselArrowBtn}
                onClick={() => scrollCarousel('left')}
                aria-label="Previous articles"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.carouselArrowBtn}
                onClick={() => scrollCarousel('right')}
                aria-label="Next articles"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel Track with Full-Bleed Image Overlay Cards */}
          <div className={styles.carouselTrack} ref={carouselRef}>
            {CAROUSEL_ARTICLES.map((item) => (
              <div key={item.id} className={styles.carouselCard}>
                <div className={styles.cardImageWrap}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 360px"
                    className={styles.cardBgImg}
                  />
                  <div className={styles.cardGradientOverlay} />
                </div>

                <div className={styles.cardContentOverlay}>
                  {/* Top Tag */}
                  <div className={styles.cardTopRow}>
                    <span className={styles.cardTag}>{item.tag}</span>
                  </div>

                  {/* Bottom Headline */}
                  <div className={styles.cardBottomRow}>
                    <h3 className={styles.cardHeadline}>{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. Categorized Knowledge Base & Full Archive Grid ── */}
      <section className={styles.archiveSection} id="all-articles">
        <div className={styles.container}>
          
          <div className={styles.archiveHeader}>
            <div className={styles.archiveEyebrow}>KNOWLEDGE REPOSITORY</div>
            <h2 className={styles.archiveTitle}>Explore by Specialization</h2>
            <p className={styles.archiveSubtitle}>
              Filter articles by technical field, export stage, or regulatory standards.
            </p>

            {/* Category Filter Chips */}
            <div className={styles.filterPillsRow}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.filterPill} ${selectedCategory === cat ? styles.filterPillActive : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className={styles.articleGrid}>
            {filteredArticles.map((article) => (
              <article key={article.id} className={styles.gridCard}>
                <div className={styles.gridCardImageWrap}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.gridCardImg}
                  />
                  <span className={styles.gridCategoryBadge}>{article.category}</span>
                </div>

                <div className={styles.gridCardBody}>
                  <h3 className={styles.gridCardTitle}>{article.title}</h3>
                  <p className={styles.gridCardExcerpt}>{article.excerpt}</p>

                  <div className={styles.gridCardFooter}>
                    <span className={styles.gridReadLink}>
                      Read Article
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="2" y1="7" x2="12" y2="7" />
                        <polyline points="7 2 12 7 7 12" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. B2B Sourcing Digest Newsletter Section ── */}
      <section className={styles.newsletterSection}>
        <div className={styles.container}>
          <div className={styles.newsletterBox}>
            <div className={styles.newsletterDecor} aria-hidden="true">TWOFOLD</div>
            
            <div className={styles.newsletterTextWrap}>
              <span className={styles.newsletterTag}>MANUFACTURING INTELLIGENCE</span>
              <h2 className={styles.newsletterHeading}>
                Stay Ahead of Global Paper Trade &amp; Manufacturing Trends.
              </h2>
              <p className={styles.newsletterSub}>
                Join 1,200+ stationery importers, distributors, and procurement managers who receive our monthly briefings on paper grammages, mill capacities, and ocean freight logistics.
              </p>
            </div>

            <div className={styles.newsletterFormWrap}>
              {subscribed ? (
                <div className={styles.subscribedNotice}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Thank you for subscribing. We will keep you updated.</span>
                </div>
              ) : (
                <form
                  className={styles.newsletterForm}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                >
                  <input
                    type="email"
                    placeholder="Enter your corporate email"
                    className={styles.newsletterInput}
                    required
                  />
                  <button type="submit" className={styles.newsletterBtn}>
                    Subscribe
                  </button>
                </form>
              )}
              <span className={styles.privacyNote}>No spam. Unsubscribe anytime. Direct from our Palghar facility.</span>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

