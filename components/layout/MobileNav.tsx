'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { navigation, secondaryNavigation, restaurantConfig } from '@/data/restaurant';
import { useWhatsApp } from '@/components/providers/WhatsAppProvider';
import { generalContactMessage } from '@/lib/whatsapp';
import { WhatsAppGlyph } from '@/components/cart/CartDrawer';
import { SmartImage } from '@/components/ui/SmartImage';
import { heroImages } from '@/data/images';
import { useBodyFlag } from '@/hooks/useBodyFlag';
import { cn } from '@/lib/utils';

const panel: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
  },
};

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.22 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const item: Variants = {
  hidden: { y: '105%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { y: '60%', opacity: 0, transition: { duration: 0.3 } },
};

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { send } = useWhatsApp();
  const containerRef = useRef<HTMLDivElement>(null);

  // Lets the floating WhatsApp button step aside while the menu covers the screen.
  useBodyFlag('data-overlay', open);

  // Lock scroll and wire up Escape while the menu is open.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          id="mobile-navigation"
          variants={panel}
          initial="hidden"
          animate="visible"
          exit="exit"
          data-lenis-prevent
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink lg:hidden"
        >
          {/* Ambient plate behind the menu */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 opacity-25">
              <SmartImage
                src={heroImages.poster.src}
                alt=""
                focal="50% 40%"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-b from-ink/85 via-ink/92 to-ink" />
            <div className="aurora absolute -top-1/4 left-1/2 h-[60vh] w-[120vw] -translate-x-1/2 rounded-full bg-jade/12 blur-[120px]" />
          </div>

          <div className="relative flex min-h-full flex-col justify-between px-(--spacing-gutter) pt-28 pb-10">
            <motion.ul variants={list} initial="hidden" animate="visible" exit="exit">
              {navigation.map((link, index) => {
                const active =
                  link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

                return (
                  <li key={link.href} className="overflow-hidden border-b border-gold/10">
                    <motion.div variants={item}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={active ? 'page' : undefined}
                        className="group flex items-baseline justify-between gap-4 py-4"
                      >
                        <span
                          className={cn(
                            'font-display text-[clamp(2.25rem,11vw,3.5rem)] leading-none transition-colors duration-300',
                            active ? 'text-gold' : 'text-cream group-hover:text-gold',
                          )}
                        >
                          {link.label}
                        </span>
                        <span className="font-sans text-[0.625rem] tracking-[0.3em] text-champagne/35 tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                );
              })}

              {secondaryNavigation.map((link) => (
                <li key={link.href} className="overflow-hidden border-b border-gold/10">
                  <motion.div variants={item}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-4 font-sans text-[0.75rem] font-semibold tracking-[0.24em] text-cream/70 uppercase transition-colors duration-300 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-col gap-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/order"
                  onClick={onClose}
                  className="bg-gold px-5 py-4.5 text-center font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-ink uppercase"
                >
                  Order now
                </Link>
                <Link
                  href="/reservations"
                  onClick={onClose}
                  className="border border-gold/40 px-5 py-4.5 text-center font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-cream uppercase"
                >
                  Reserve
                </Link>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  send(generalContactMessage());
                }}
                className="flex items-center justify-center gap-2.5 border border-jade/50 bg-jade/10 px-5 py-4 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-champagne uppercase"
              >
                <WhatsAppGlyph className="h-4 w-4" />
                Contact us on WhatsApp
              </button>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="font-sans text-[0.625rem] tracking-[0.26em] text-cream/35 uppercase">
                  {restaurantConfig.address.city}, {restaurantConfig.address.country}
                </p>
                <ul className="flex gap-5">
                  {restaurantConfig.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[0.625rem] tracking-[0.26em] text-cream/50 uppercase transition-colors duration-300 hover:text-gold"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
