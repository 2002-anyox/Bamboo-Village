'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Hairline reading-progress indicator pinned to the very top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[65] h-0.5 origin-left bg-linear-to-r from-jade via-gold to-ember"
    />
  );
}
