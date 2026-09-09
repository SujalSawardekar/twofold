'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Custom hook for scroll-triggered reveal animations.
 * Attach the returned ref to a container, and all children
 * with the .reveal class will animate in on scroll.
 * 
 * @param {Object} options
 * @param {number} options.stagger - Stagger delay between elements (default: 0.1)
 * @param {string} options.start - ScrollTrigger start position (default: 'top 85%')
 * @param {number} options.y - Initial Y offset (default: 40)
 * @param {number} options.duration - Animation duration (default: 0.8)
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const {
    stagger = 0.1,
    start = 'top 85%',
    y = 40,
    duration = 0.8,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const elements = ref.current.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    gsap.from(elements, {
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y,
      duration,
      stagger,
      ease: 'power3.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [stagger, start, y, duration]);

  return ref;
}
