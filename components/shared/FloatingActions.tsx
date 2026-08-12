'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWhatsApp } from '@/components/providers/WhatsAppProvider';
import { generalContactMessage } from '@/lib/whatsapp';
import { WhatsAppGlyph } from '@/components/cart/CartDrawer';
import { restaurantConfig } from '@/data/restaurant';

/**
 * Persistent bottom-right stack: a WhatsApp shortcut that is always within
 * thumb reach, and a back-to-top control that appears once the guest has
 * scrolled past the first screen.
 */
export function FloatingActions() {
  const { send } = useWhatsApp();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className="floating-actions fixed right-4 bottom-4 z-[55] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex h-11 w-11 items-center justify-center border border-gold/25 text-cream/80 transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => send(generalContactMessage())}
        aria-label={`Message ${restaurantConfig.name} on WhatsApp`}
        data-cursor="Chat"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-jade text-cream shadow-[0_10px_40px_rgba(8,127,91,0.45)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-jade/40 [animation-duration:3s]"
        />
        <WhatsAppGlyph className="relative h-6 w-6" />
      </motion.button>
    </div>
  );
}
