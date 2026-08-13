'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from './CartProvider';
import { CartItemRow } from './CartItemRow';
import { OrderDetailsFields } from './OrderDetailsFields';
import { useOrderCheckout } from './useOrderCheckout';
import { formatPrice } from '@/lib/format';
import { restaurantConfig } from '@/data/restaurant';
import { cn } from '@/lib/utils';

/**
 * Slide-out order panel. Available from every page via the navbar, and
 * complete enough to place an order without leaving the menu.
 */
export function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    deliveryFee,
    total,
    isOpen,
    closeCart,
    setQuantity,
    removeItem,
    clear,
  } = useCart();

  const { errors, submit, clearError } = useOrderCheckout();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape to close, and trap focus inside the panel while it is open.
  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCart();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Your order">
          {/* Click-away layer — presentational, so it does not duplicate the
              visible close control as a tab stop. Escape also closes. */}
          <motion.div
            role="presentation"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'absolute inset-y-0 right-0 flex w-full flex-col border-l border-gold/20',
              'bg-surface shadow-[0_0_80px_rgba(0,0,0,0.6)] sm:max-w-[30rem]',
            )}
          >
            {/* Header */}
            <header className="flex items-start justify-between gap-4 border-b border-gold/15 px-6 py-6 sm:px-8">
              <div>
                <p className="eyebrow mb-2">Your order</p>
                <p className="font-display text-2xl text-cream">
                  {count === 0
                    ? 'Nothing yet'
                    : `${count} ${count === 1 ? 'item' : 'items'}`}
                </p>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={closeCart}
                aria-label="Close your order"
                className="-mr-2 p-2 text-cream/60 transition-colors duration-200 hover:text-gold"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            {/* Body — data-lenis-prevent keeps smooth scrolling from stealing
                the wheel events that belong to this panel. */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8"
            >
              {lines.length === 0 ? (
                <EmptyCart onClose={closeCart} />
              ) : (
                <>
                  <ul className="flex flex-col gap-6">
                    <AnimatePresence initial={false} mode="popLayout">
                      {lines.map((line) => (
                        <CartItemRow
                          key={line.id}
                          line={line}
                          onQuantityChange={(quantity) => setQuantity(line.id, quantity)}
                          onRemove={() => removeItem(line.id)}
                        />
                      ))}
                    </AnimatePresence>
                  </ul>

                  <button
                    type="button"
                    onClick={clear}
                    className="mt-6 font-sans text-[0.6875rem] tracking-[0.2em] text-cream/40 uppercase transition-colors duration-200 hover:text-ember"
                  >
                    Clear order
                  </button>

                  {/* Details are shown straight away rather than behind a
                      "continue" step — one screen, no extra tap, and the
                      guest can start typing as soon as the panel opens. */}
                  <div id="cart-details">
                    <div className="rule-gold my-6" />
                    <p className="eyebrow mb-4">Your details</p>
                    <OrderDetailsFields
                      errors={errors}
                      clearError={clearError}
                      density="compact"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <footer className="border-t border-gold/15 bg-ink/40 px-6 py-6 sm:px-8">
                <dl className="mb-5 flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <dt className="font-sans text-[0.6875rem] tracking-[0.2em] text-cream/50 uppercase">
                      Subtotal
                    </dt>
                    <dd className="font-sans text-sm text-cream tabular-nums">
                      {formatPrice(subtotal)}
                    </dd>
                  </div>

                  {deliveryFee > 0 && (
                    <div className="flex items-baseline justify-between">
                      <dt className="font-sans text-[0.6875rem] tracking-[0.2em] text-cream/50 uppercase">
                        Delivery
                      </dt>
                      <dd className="font-sans text-sm text-cream tabular-nums">
                        {formatPrice(deliveryFee)}
                      </dd>
                    </div>
                  )}

                  <div className="mt-2 flex items-baseline justify-between border-t border-gold/15 pt-3">
                    <dt className="font-sans text-[0.75rem] font-semibold tracking-[0.2em] text-champagne uppercase">
                      Total
                    </dt>
                    <dd className="font-display text-2xl text-gold tabular-nums">
                      {formatPrice(total)}
                    </dd>
                  </div>
                </dl>

                {errors.cart && (
                  <p role="alert" className="mb-4 text-xs text-ember">
                    {errors.cart}
                  </p>
                )}

                <button
                  type="button"
                  onClick={submit}
                  className={cn(
                    'group relative flex w-full items-center justify-center gap-3 overflow-hidden',
                    'bg-gold px-6 py-4.5 font-sans text-[0.75rem] font-semibold',
                    'tracking-[0.2em] text-ink uppercase',
                    'transition-colors duration-300 hover:bg-champagne',
                  )}
                >
                  <WhatsAppGlyph className="h-4 w-4" />
                  Order via WhatsApp
                </button>

                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={closeCart}
                    className="flex-1 border border-gold/25 px-4 py-3.5 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-cream/80 uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    Continue shopping
                  </button>
                  <Link
                    href="/order"
                    onClick={closeCart}
                    className="flex-1 border border-gold/25 px-4 py-3.5 text-center font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-cream/80 uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    Full checkout
                  </Link>
                </div>

                <p className="mt-4 text-center text-[0.6875rem] leading-relaxed text-cream/35">
                  Orders are confirmed over WhatsApp with {restaurantConfig.name}.
                </p>
              </footer>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 py-16 text-center">
      <svg
        viewBox="0 0 48 64"
        className="h-16 w-12 text-gold/30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <path d="M24 62V10" strokeLinecap="round" />
        <path d="M24 44c0-8-6-13-14-15 0 8 6 13 14 15Z" />
        <path d="M24 30c0-8 6-13 14-15 0 8-6 13-14 15Z" />
      </svg>

      <div>
        <p className="font-display text-2xl text-cream">Your order is empty</p>
        <p className="mx-auto mt-3 max-w-[28ch] text-sm leading-relaxed text-cream/50">
          Everything from the grill to the bar is a tap away.
        </p>
      </div>

      <Link
        href="/menu"
        onClick={onClose}
        className="group relative overflow-hidden border border-gold/40 px-7 py-4 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors duration-300 hover:border-gold"
      >
        <span className="relative">Explore the menu</span>
      </Link>
    </div>
  );
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14 0-.31-.01-.47-.01-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}
