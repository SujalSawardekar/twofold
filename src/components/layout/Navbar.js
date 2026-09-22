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

  const { playDrawerOpen, playDrawerClose } = useSound();
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  // ── Scroll Listener ──
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (!isOpen) {
        if (currentScrollY > 150 && currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

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

          {/* Center: Horizontal Navigation Links */}
          <nav className={styles.navCenter} aria-label="Main Navigation">
            <ul className={styles.desktopNavList}>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                return (
                  <li key={item.path}>
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
            >
              <svg
                className={styles.secondaryIcon}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
              <span>Catalogue</span>
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
