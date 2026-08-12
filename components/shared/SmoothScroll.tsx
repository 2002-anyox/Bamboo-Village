'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Inertial smooth scrolling on pointer devices.
 *
 * Skipped entirely when the guest prefers reduced motion, and on touch, where
 * the platform's native scrolling already feels better than anything we'd add.
 * Overlays that scroll internally (cart, lightbox, mobile menu) opt out with
 * `data-lenis-prevent`.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || coarsePointer) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
