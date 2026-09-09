'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { useSound } from '@/providers/SoundEffectsProvider';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { index: '01', name: 'Home', path: '/' },
  { index: '02', name: 'About Us', path: '/about-us' },
  { index: '03', name: 'Products', path: '/products' },
  { index: '04', name: 'Blog & Insights', path: '/blog' },
  { index: '05', name: 'Contact Us', path: '/contact-us' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { playDrawerOpen, playDrawerClose } = useSound();

  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const drawerRef = useRef(null);
  const navLinksRef = useRef(null);

  // ── Headroom Scroll Behavior & Theme Detection ──
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide when scrolling down, show when scrolling up (only when drawer is closed)
      if (!isOpen) {
        if (currentScrollY > 120 && currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;

      // Detect if floating navbar sits over a dark section (e.g. Why Buyers Choose Twofold)
      const darkElements = document.querySelectorAll('[data-theme="dark"], #why-twofold');
      const headerHeight = 84;
      let overDark = false;
      darkElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= 0) {
          overDark = true;
        }
      });
      setIsDarkTheme(overDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // ── Lock Body Scroll & Keyboard Escape ──
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // GSAP staggered entrance animation for drawer items
      if (navLinksRef.current) {
        const items = navLinksRef.current.querySelectorAll(`.${styles.navLink}`);
        gsap.fromTo(items,
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.12 }
        );
      }
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
      {/* ── Fixed Minimalist Header ── */}
      <header
        className={`
          ${styles.header}
          ${isOpen || isVisible ? styles.headerVisible : styles.headerHidden}
          ${isScrolled && !isOpen ? styles.headerScrolled : ''}
          ${isDarkTheme && !isOpen ? styles.headerDark : ''}
          ${isOpen ? styles.headerOpen : ''}
        `}
      >
        {/* Left: Two Fold official brand logo */}
        <Link href="/" className={styles.linkLogo} aria-label="Twofold Home" onClick={() => setIsOpen(false)}>
          <Image
            src="/Logo/Two Fold.png"
            alt="Twofold"
            width={110}
            height={34}
            className={styles.brandLogoImg}
            priority
          />
        </Link>

        {/* Right: Unified 2-Line Morphing Toggle Button (No title/text) */}
        <button
          className={`${styles.menuToggle} ${isOpen ? styles.menuToggleOpen : ''}`}
          onClick={() => {
            if (isOpen) {
              playDrawerClose();
              setIsOpen(false);
            } else {
              playDrawerOpen();
              setIsOpen(true);
            }
          }}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          suppressHydrationWarning
        >
          <span className={styles.line} />
          <span className={styles.line} />
        </button>
      </header>

      {/* ── Fullscreen Editorial Navigation Drawer ── */}
      <div
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Drawer Main Content */}
        <div className={styles.drawerContent}>
          <ul className={styles.navLinks} ref={navLinksRef}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link
                  href={item.path}
                  className={styles.navLink}
                  onClick={() => {
                    playDrawerClose();
                    setIsOpen(false);
                  }}
                >
                  <span className={styles.navLinkIndex}>{item.index}</span>
                  <span className={styles.navLinkText}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
