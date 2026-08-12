'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * Custom cursor for fine-pointer devices: a small solid dot that tracks
 * precisely, and a gold ring that trails on a spring and expands over
 * interactive elements.
 *
 * Any element can request a label by setting `data-cursor="View"`.
 * Hidden entirely on touch devices and under prefers-reduced-motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    setEnabled(true);

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = (event.target as HTMLElement | null)?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]',
      ) as HTMLElement | null;

      setActive(Boolean(target));
      setLabel(target?.dataset.cursor ?? null);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="cursor-ring pointer-events-none fixed inset-0 z-[90] hidden lg:block"
    >
      {/* Trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: label ? 1.9 : active ? 1.5 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-gold/70"
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.22 }}
              className="font-sans text-[0.3rem] font-semibold tracking-[0.2em] text-gold uppercase"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        style={{ x, y }}
        animate={{ opacity: visible && !label ? 1 : 0, scale: active ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute top-0 left-0 -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full bg-gold"
      />
    </div>
  );
}
