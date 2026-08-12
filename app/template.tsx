'use client';

import { motion } from 'framer-motion';

/**
 * Page transition. `template.tsx` remounts on every navigation, so this runs
 * once per route change: a curtain lifts away and the page settles in.
 *
 * The markup is identical regardless of motion preference — reduced motion is
 * applied globally by <MotionConfig reducedMotion="user"> in layout.tsx, which
 * removes the transform animation and leaves the curtain out of the way.
 * Branching the markup here instead would break hydration for those guests.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        // Both scaleY and opacity target "gone", so the curtain clears whether
        // or not transform animation is permitted.
        initial={{ scaleY: 1, opacity: 1 }}
        animate={{ scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none fixed inset-0 z-[75] origin-top bg-forest"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
