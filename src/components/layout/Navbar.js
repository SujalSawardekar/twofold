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
      {/* ── Desktop & Mobile Floating Capsule Header ── */}
      <header
        className={`
          ${styles.header}
          ${isOpen || isVisible ? styles.headerVisible : styles.headerHidden}
          ${isScrolled && !isOpen ? styles.headerScrolled : ''}
          ${isOpen ? styles.headerOpen : ''}
        `}
      >
        <div className={styles.navbarCapsule}>

          {/* Left: Two Fold Official Brand Logo (Inverted to Pure White on Dark Capsule) */}
          <Link href="/" className={styles.linkLogo} aria-label="Twofold Home" onClick={() => setIsOpen(false)}>
            <Image
              src="/Logo/Two Fold.png"
              alt="Twofold"
              width={105}
              height={30}
              className={styles.brandLogoImg}
              priority
            />
          </Link>

          {/* Center: Horizontal Navigation Links */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <ul className={styles.desktopNavList}>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`${styles.desktopNavLink} ${isActive ? styles.activeLink : ''}`}
                    >
                      <span>{item.name}</span>
                      {isActive && <span className={styles.activeDot} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Embedded Cream-Gold Capsule CTA Button & Mobile Menu Toggle */}
          <div className={styles.rightActions}>
            <Link
              href="/contact-us"
              className={styles.capsuleCta}
            >
              Partner With Us
            </Link>

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
              Request a Quote
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
