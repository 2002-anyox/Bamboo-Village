'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { navigation, restaurantConfig } from '@/data/restaurant';
import { useCart } from '@/components/cart/CartProvider';
import { useWhatsApp } from '@/components/providers/WhatsAppProvider';
import { generalContactMessage } from '@/lib/whatsapp';
import { WhatsAppGlyph } from '@/components/cart/CartDrawer';
import { MobileNav } from './MobileNav';
import { Wordmark } from './Wordmark';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const { count, openCart, pulseKey, hydrated } = useCart();
  const { send } = useWhatsApp();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Condense on scroll, and hide when scrolling down past the fold.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > 560 && latest > previous && !menuOpen);
  });

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Skip link — first stop for keyboard and screen-reader users. */}
      <a
        href="#main"
        className="sr-only-focusable fixed top-4 left-4 z-[100] bg-gold px-5 py-3 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-ink uppercase"
      >
        Skip to content
      </a>

      <motion.header
        initial={false}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Slim information strip — desktop only. */}
        <div
          className={cn(
            'hidden overflow-hidden border-b border-gold/10 bg-ink/90 transition-[height,opacity] duration-500 lg:block',
            scrolled ? 'h-0 opacity-0' : 'h-9 opacity-100',
          )}
        >
          <div className="shell-wide flex h-9 items-center justify-between">
            <p className="font-sans text-[0.625rem] tracking-[0.28em] text-champagne/55 uppercase">
              {restaurantConfig.address.city}, {restaurantConfig.address.country} —
              Kitchen &amp; bar open daily
            </p>
            <button
              type="button"
              onClick={() => send(generalContactMessage())}
              className="group flex items-center gap-2 font-sans text-[0.625rem] tracking-[0.28em] text-champagne/55 uppercase transition-colors duration-300 hover:text-gold"
            >
              <WhatsAppGlyph className="h-3 w-3" />
              Contact us on WhatsApp
            </button>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={cn(
            'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            scrolled || menuOpen
              ? 'glass border-b border-gold/12'
              : 'border-b border-transparent bg-transparent',
          )}
        >
          <nav
            aria-label="Primary"
            className={cn(
              'shell-wide flex items-center justify-between gap-6 transition-[padding] duration-500',
              scrolled ? 'py-3.5' : 'py-5 lg:py-6',
            )}
          >
            <Link
              href="/"
              aria-label={`${restaurantConfig.name} — home`}
              className="group relative z-10 shrink-0"
            >
              <Wordmark
                className={cn(
                  'transition-all duration-500',
                  scrolled ? 'h-7' : 'h-8 lg:h-9',
                )}
              />
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navigation.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative block px-4 py-2 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] uppercase',
                        'transition-colors duration-300',
                        active ? 'text-gold' : 'text-cream/75 hover:text-cream',
                      )}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-gold"
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <CartButton count={count} onOpen={openCart} pulseKey={pulseKey} ready={hydrated} />

              <Link
                href="/reservations"
                className="hidden border border-gold/35 px-5 py-3 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-cream uppercase transition-colors duration-300 hover:border-gold hover:text-gold xl:block"
              >
                Reserve a table
              </Link>

              <Link
                href="/order"
                className="group relative hidden overflow-hidden bg-gold px-5 py-3 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-ink uppercase sm:block"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-champagne transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
                <span className="relative">Order now</span>
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="relative z-10 flex h-11 w-11 items-center justify-center lg:hidden"
              >
                <span className="relative block h-3.5 w-6">
                  <motion.span
                    animate={
                      menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-0 left-0 block h-px w-6 bg-cream"
                  />
                  <motion.span
                    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1.5 left-0 block h-px w-4 bg-cream"
                  />
                  <motion.span
                    animate={
                      menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-0 left-0 block h-px w-6 bg-cream"
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function CartButton({
  count,
  onOpen,
  pulseKey,
  ready,
}: {
  count: number;
  onOpen: () => void;
  pulseKey: number;
  ready: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={
        count > 0 ? `Open your order — ${count} items` : 'Open your order'
      }
      className="group relative flex h-11 w-11 items-center justify-center text-cream transition-colors duration-300 hover:text-gold"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        aria-hidden="true"
      >
        <path
          d="M4.5 7.5h15l-1.2 12a1.5 1.5 0 0 1-1.5 1.35H7.2a1.5 1.5 0 0 1-1.5-1.35L4.5 7.5Z"
          strokeLinejoin="round"
        />
        <path d="M8.75 10V6.4a3.25 3.25 0 0 1 6.5 0V10" strokeLinecap="round" />
      </svg>

      <AnimatePresence>
        {ready && count > 0 && (
          <motion.span
            key={pulseKey}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 460, damping: 22 }}
            className="cart-pulse absolute top-1 right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold px-1 font-sans text-[0.625rem] font-bold text-ink tabular-nums"
          >
            {count > 99 ? '99+' : count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
