'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.inner}>

        {/* ── Dark Theme Floating Card Container (Enky Reference Design) ── */}
        <div className={styles.footerCard}>

          {/* ── TOP SECTION: BRAND & NEWSLETTER (LEFT) + LINKS GRID (RIGHT) ── */}
          <div className={styles.topRow}>

            {/* Left: Official White Logo, Newsletter Form, & Social Icons */}
            <div className={styles.brandCol}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/Logo/Two Fold White.png"
                  alt="Twofold Stationery"
                  width={160}
                  height={50}
                  className={styles.brandLogoImg}
                  priority
                />
              </div>

              <p className={styles.newsletterPrompt}>
                Join our newsletter to stay up to date on high-volume paper manufacturing, product releases, and export updates.
              </p>

              {/* Newsletter Email Subscription Form */}
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.emailInput}
                />
                <button type="submit" className={styles.subscribeBtn}>
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>

              {/* Clean SVG Social Media Icons */}
              <div className={styles.socialRow}>
                {/* Facebook */}
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.65 13.75 5.65c1.08 0 2.25.19 2.25.19v2.47h-1.27c-1.23 0-1.61.77-1.61 1.56V12h2.78l-.45 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="YouTube">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Navigation Columns */}
            <div className={styles.linksGrid}>

              <div className={styles.linkGroup}>
                <h4 className={styles.groupHeading}>Sitemap</h4>
                <ul className={styles.linkList}>
                  <li><Link href="#hero" className={styles.footerLink}>Home</Link></li>
                  <li><Link href="#who-we-are" className={styles.footerLink}>Who We Are</Link></li>
                  <li><Link href="#why-twofold" className={styles.footerLink}>Why Twofold</Link></li>
                  <li><Link href="#products" className={styles.footerLink}>Products</Link></li>
                  <li><Link href="#quality-assurance" className={styles.footerLink}>Quality & Craft</Link></li>
                  <li><Link href="#insights" className={styles.footerLink}>Insights</Link></li>
                </ul>
              </div>

              <div className={styles.linkGroup}>
                <h4 className={styles.groupHeading}>Products</h4>
                <ul className={styles.linkList}>
                  <li><Link href="#notebook-shelf" className={styles.footerLink}>Exercise Books</Link></li>
                  <li><Link href="#notebook-shelf" className={styles.footerLink}>Spiral Bound</Link></li>
                  <li><Link href="#notebook-shelf" className={styles.footerLink}>Wire-O Bound</Link></li>
                  <li><Link href="#notebook-shelf" className={styles.footerLink}>Hardcover Journals</Link></li>
                  <li><Link href="#notebook-shelf" className={styles.footerLink}>Perfect Bound</Link></li>
                </ul>
              </div>

              <div className={styles.linkGroup}>
                <h4 className={styles.groupHeading}>Contact</h4>
                <div className={styles.contactDetails}>
                  <p className={styles.contactItem}>Palghar, Maharashtra, India</p>
                  <p className={styles.contactItem}>Email: export@twofoldpaper.com</p>
                  <p className={styles.contactItem}>Phone: +91 (022) 2854-9900</p>
                  <p className={styles.contactItem}>WhatsApp: +91 98200 00000</p>
                </div>
              </div>

            </div>

          </div>

          {/* ── BOTTOM SECTION: GIANT BRAND LOGO WITH DARK GRADIENT MASK OVERLAY (Two Fold.png) ── */}
          <div className={styles.giantLogoContainer}>
            <div className={styles.gradientMaskOverlay} />
            <Image
              src="/Logo/Two Fold.png"
              alt="Twofold"
              width={1400}
              height={450}
              className={styles.giantLogoImg}
            />
          </div>

          {/* ── BOTTOM BAR: COPYRIGHT & LEGAL ── */}
          <div className={styles.bottomBar}>
            <p className={styles.copyText}>© {new Date().getFullYear()} Twofold Manufacturing. All rights reserved.</p>
            <div className={styles.legalLinks}>
              <Link href="/privacy-policy" className={styles.legalLink}>Privacy Policy</Link>
              <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
