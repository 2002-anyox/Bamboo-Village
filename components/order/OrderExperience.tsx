'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import { QuantityStepper } from '@/components/cart/QuantityStepper';
import { OrderDetailsFields } from '@/components/cart/OrderDetailsFields';
import { useOrderCheckout } from '@/components/cart/useOrderCheckout';
import { useCart } from '@/components/cart/CartProvider';
import { WhatsAppGlyph } from '@/components/cart/CartDrawer';
import { Reveal } from '@/components/ui/Reveal';
import { menuCategories, menuItems, type MenuCategoryId } from '@/data/menu';
import { formatPrice } from '@/lib/format';
import { restaurantConfig } from '@/data/restaurant';
import { cn } from '@/lib/utils';

type Filter = MenuCategoryId | 'all';

export function OrderExperience() {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const { lines, count, subtotal, deliveryFee, total, addItem, setQuantity } = useCart();
  const { errors, submit, clearError } = useOrderCheckout();

  const visibleItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesCategory = filter === 'all' || item.category === filter;
      const matchesQuery =
        term.length === 0 ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [filter, query]);

  const quantityFor = (id: string) =>
    lines.find((line) => line.id === id)?.quantity ?? 0;

  return (
    <section className="section bg-ink" aria-label="Place an order">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ── Browse ──────────────────────────────────────────────────── */}
          {/* min-w-0 lets the grid track shrink below the filter rail's
              natural width, so the rail scrolls instead of widening the page. */}
          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              <div className="flex flex-col gap-5">
                <label className="relative block">
                  <span className="sr-only">Search the menu</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search dishes and drinks…"
                    className="w-full border border-gold/20 bg-surface/50 py-4 pr-4 pl-12 text-[0.9375rem] text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
                  />
                  <svg
                    viewBox="0 0 20 20"
                    className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gold/60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <circle cx="8.5" cy="8.5" r="5.5" />
                    <path d="m13 13 4 4" strokeLinecap="round" />
                  </svg>
                </label>

                <nav aria-label="Filter menu by category">
                  <ul className="rail gap-2 pb-1">
                    <FilterChip
                      label="Everything"
                      active={filter === 'all'}
                      onClick={() => setFilter('all')}
                    />
                    {menuCategories.map((category) => (
                      <FilterChip
                        key={category.id}
                        label={category.name}
                        active={filter === category.id}
                        onClick={() => setFilter(category.id)}
                      />
                    ))}
                  </ul>
                </nav>
              </div>
            </Reveal>

            <p aria-live="polite" className="mt-6 text-[0.6875rem] tracking-[0.2em] text-cream/35 uppercase">
              {visibleItems.length} {visibleItems.length === 1 ? 'item' : 'items'}
            </p>

            {visibleItems.length === 0 ? (
              <p className="mt-10 border border-gold/15 p-8 text-center text-sm text-cream/50">
                Nothing matched &ldquo;{query}&rdquo;. Try a different search, or{' '}
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setFilter('all');
                  }}
                  className="text-gold underline underline-offset-4"
                >
                  show everything
                </button>
                .
              </p>
            ) : (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {visibleItems.map((item, index) => {
                  const quantity = quantityFor(item.id);

                  return (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: Math.min(index, 8) * 0.035,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn(
                        'group flex gap-4 border p-3.5 transition-colors duration-400',
                        quantity > 0
                          ? 'border-gold/45 bg-gold/5'
                          : 'border-gold/12 bg-surface/40 hover:border-gold/30',
                      )}
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden">
                        <div className="absolute inset-0 transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
                          <SmartImage src={item.image} alt={item.alt} sizes="80px" />
                        </div>
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                        <div>
                          <h3 className="font-display text-base leading-tight text-cream">
                            {item.name}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-cream/45">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <span className="font-sans text-[0.8125rem] font-semibold text-gold tabular-nums">
                            {formatPrice(item.price)}
                          </span>

                          {quantity > 0 ? (
                            <QuantityStepper
                              value={quantity}
                              onChange={(next) => setQuantity(item.id, next)}
                              label={item.name}
                              size="sm"
                              min={0}
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => addItem(item)}
                              aria-label={`Add ${item.name} to your order`}
                              className="border border-gold/35 px-4 py-2 font-sans text-[0.5625rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors duration-300 hover:bg-gold hover:text-ink"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* ── Order summary ───────────────────────────────────────────── */}
          <div className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="border border-gold/20 bg-surface/60">
                <header className="flex items-baseline justify-between gap-4 border-b border-gold/15 px-6 py-5">
                  <h2 className="font-display text-2xl text-cream">Your order</h2>
                  <span className="font-sans text-[0.625rem] tracking-[0.22em] text-cream/45 tabular-nums uppercase">
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                </header>

                <div className="px-6 py-6">
                  {lines.length === 0 ? (
                    <p className="py-8 text-center text-sm leading-relaxed text-cream/45">
                      Nothing here yet. Add something from the list and it will appear
                      right away.
                    </p>
                  ) : (
                    <ul className="flex flex-col gap-4">
                      <AnimatePresence initial={false} mode="popLayout">
                        {lines.map((line) => (
                          <motion.li
                            key={line.id}
                            layout
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center justify-between gap-3 border-b border-gold/10 pb-4"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-sans text-sm text-cream">
                                {line.name}
                              </p>
                              <p className="mt-0.5 font-sans text-[0.6875rem] text-cream/40 tabular-nums">
                                {formatPrice(line.price)} × {line.quantity}
                              </p>
                            </div>

                            <QuantityStepper
                              value={line.quantity}
                              onChange={(next) => setQuantity(line.id, next)}
                              label={line.name}
                              size="sm"
                              min={0}
                            />

                            <span className="w-24 shrink-0 text-right font-sans text-sm text-gold tabular-nums">
                              {formatPrice(line.price * line.quantity)}
                            </span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}

                  <div className="mt-7">
                    <h3 className="eyebrow mb-6">Your details</h3>
                    <OrderDetailsFields errors={errors} clearError={clearError} compact />
                  </div>

                  <dl className="mt-8 flex flex-col gap-2.5 border-t border-gold/15 pt-6">
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

                    <div className="mt-2 flex items-baseline justify-between border-t border-gold/15 pt-4">
                      <dt className="font-sans text-[0.75rem] font-semibold tracking-[0.2em] text-champagne uppercase">
                        Total
                      </dt>
                      <dd className="font-display text-3xl text-gold tabular-nums">
                        {formatPrice(total)}
                      </dd>
                    </div>
                  </dl>

                  {errors.cart && (
                    <p role="alert" className="mt-4 text-xs text-ember">
                      {errors.cart}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={submit}
                    className="mt-6 flex w-full items-center justify-center gap-3 bg-gold px-6 py-5 font-sans text-[0.75rem] font-semibold tracking-[0.2em] text-ink uppercase transition-colors duration-300 hover:bg-champagne"
                  >
                    <WhatsAppGlyph className="h-4 w-4" />
                    Order via WhatsApp
                  </button>

                  <Link
                    href="/menu"
                    className="mt-3 block border border-gold/25 px-6 py-4 text-center font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-cream/80 uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    Continue shopping
                  </Link>

                  <p className="mt-5 text-center text-[0.6875rem] leading-relaxed text-cream/35">
                    Your order opens in WhatsApp with everything filled in. Nothing is
                    charged online — you confirm the total and payment directly with{' '}
                    {restaurantConfig.name}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cn(
          'border px-4 py-2.5 font-sans text-[0.625rem] font-semibold tracking-[0.18em] whitespace-nowrap uppercase transition-all duration-300',
          active
            ? 'border-gold bg-gold text-ink'
            : 'border-gold/20 text-cream/60 hover:border-gold/50 hover:text-cream',
        )}
      >
        {label}
      </button>
    </li>
  );
}
