'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useSound } from '@/providers/SoundEffectsProvider';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Products', path: '/products' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact Us', path: '/contact-us' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const { playDrawerOpen, playDrawerClose } = useSound();
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  // ── Scroll Listener with Progressive Nav Link Collapse ──
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isDeltaDown = currentScrollY > lastScrollY.current;

      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Collapse nav links one-by-one on scroll DOWN past 40px; unfold on scroll UP
      if (currentScrollY > 40 && isDeltaDown) {
        setIsNavCollapsed(true);
      } else if (!isDeltaDown || currentScrollY <= 40) {
        setIsNavCollapsed(false);
      }

      // Header and logo remain permanently visible during scroll
      setIsVisible(true);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // ── Lock Body Scroll & Keyboard Escape ──
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // ── Auto-close on Route Change ──
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── Full-Width Navigation Bar ── */}
      <header
        className={`
          ${styles.header}
          ${isOpen || isVisible ? styles.headerVisible : styles.headerHidden}
          ${isScrolled ? styles.headerScrolled : ''}
          ${isOpen ? styles.headerOpen : ''}
          ${isNavCollapsed ? styles.headerCollapsed : ''}
        `}
      >
        <div className={styles.headerContainer}>

          {/* Left: Brand Logo */}
          <div className={styles.navLeft}>
            <Link href="/" className={styles.linkLogo} aria-label="Twofold Home" onClick={() => setIsOpen(false)}>
              <Image
                src="/Logo/Two Fold.png"
                alt="Twofold"
                width={120}
                height={34}
                className={styles.brandLogoImg}
                priority
              />
            </Link>
          </div>

          {/* Center: Horizontal Navigation Links with Progressive Staggered Collapse */}
          <nav className={styles.navCenter} aria-label="Main Navigation">
            <ul
              className={`
                ${styles.desktopNavList}
                ${isNavCollapsed ? styles.navListCollapsed : ''}
              `}
            >
              {NAV_ITEMS.map((item, idx) => {
                const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                const total = NAV_ITEMS.length;
                const collapseDelay = (total - 1 - idx) * 0.05; // 0.20s down to 0s
                const expandDelay = idx * 0.05; // 0s up to 0.20s

                return (
                  <li
                    key={item.path}
                    className={styles.desktopNavItem}
                    style={{
                      transitionDelay: isNavCollapsed ? `${collapseDelay}s` : `${expandDelay}s`,
                    }}
                  >
                    <Link
                      href={item.path}
                      className={`${styles.desktopNavLink} ${isActive ? styles.activeLink : ''}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Secondary Action & Pill CTA Button */}
          <div className={styles.navRight}>
            <Link
              href="/products"
              className={styles.secondaryAction}
              title="View & Download Twofold Product Catalogue"
            >
              <span>Catalogue</span>
              <svg
                className={styles.downloadIcon}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </Link>

            <Button
              href="/contact-us"
              variant="primary"
              size="small"
            >
              Partner With Us
            </Button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className={`${styles.mobileMenuToggle} ${isOpen ? styles.menuToggleOpen : ''}`}
              onClick={() => {
                if (isOpen) {
                  playDrawerClose?.();
                  setIsOpen(false);
                } else {
                  playDrawerOpen?.();
                  setIsOpen(true);
                }
              }}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              suppressHydrationWarning
            >
              <span className={styles.line} />
              <span className={styles.line} />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile Navigation Drawer ── */}
      <div
        className={`${styles.mobileDrawer} ${isOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className={styles.drawerInner}>
          <ul className={styles.mobileNavLinks}>
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.path} className={styles.mobileNavItem}>
                <Link
                  href={item.path}
                  className={styles.mobileNavLink}
                  onClick={() => {
                    playDrawerClose?.();
                    setIsOpen(false);
                  }}
                >
                  <span className={styles.mobileIndex}>0{idx + 1}</span>
                  <span className={styles.mobileText}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.drawerFooter}>
            <Button
              href="/contact-us"
              variant="primary"
              size="default"
              fullWidth
              hasArrow
              onClick={() => setIsOpen(false)}
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
