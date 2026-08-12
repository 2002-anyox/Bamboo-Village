'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import { useCart } from '@/components/cart/CartProvider';
import { formatPrice } from '@/lib/format';
import { dietaryTagLabels, type MenuItem } from '@/data/menu';
import { cn } from '@/lib/utils';

/**
 * A single dish. Two presentations from one component:
 *   'row'     — the dense, scannable default used inside each category
 *   'feature' — the large card used in the "Village favourites" rail
 */
export function MenuItemCard({
  item,
  variant = 'row',
  index = 0,
}: {
  item: MenuItem;
  variant?: 'row' | 'feature';
  index?: number;
}) {
  if (variant === 'feature') return <FeatureCard item={item} index={index} />;
  return <RowCard item={item} index={index} />;
}

/** Add button with an inline confirmation state. */
function AddToOrder({
  item,
  className,
  label = 'Add to order',
}: {
  item: MenuItem;
  className?: string;
  label?: string;
}) {
  const { addItem } = useCart();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!confirmed) return;
    const timer = setTimeout(() => setConfirmed(false), 1600);
    return () => clearTimeout(timer);
  }, [confirmed]);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        addItem(item);
        setConfirmed(true);
      }}
      aria-label={`Add ${item.name} to your order — ${formatPrice(item.price)}`}
      className={cn(
        'group/add relative flex items-center justify-center gap-2.5 overflow-hidden',
        'border px-5 py-3 font-sans text-[0.625rem] font-semibold tracking-[0.2em] uppercase',
        'transition-colors duration-300',
        confirmed
          ? 'border-jade bg-jade text-cream'
          : 'border-gold/35 text-cream hover:border-gold',
        className,
      )}
    >
      {!confirmed && (
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/add:scale-y-100"
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        {confirmed ? (
          <motion.span
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="relative flex items-center gap-2"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <motion.path
                d="M3 8.5 6.5 12 13 4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </svg>
            Added
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="relative transition-colors duration-300 group-hover/add:text-ink"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function DietaryTags({ item }: { item: MenuItem }) {
  if (!item.tags || item.tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-1.5">
      {item.tags.map((tag) => {
        const label = dietaryTagLabels[tag];
        return (
          <li key={tag}>
            <span
              title={label.full}
              className="flex h-5 min-w-5 items-center justify-center border border-gold/25 px-1.5 font-sans text-[0.5625rem] font-bold tracking-[0.08em] text-champagne/70"
            >
              {label.short}
              <span className="sr-only"> — {label.full}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function RowCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index, 5) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex gap-5 border-b border-gold/10 pb-7"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-gold/12 sm:h-28 sm:w-28">
        <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
          <SmartImage src={item.image} alt={item.alt} sizes="112px" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl leading-tight text-cream transition-colors duration-300 group-hover:text-gold">
            {item.name}
          </h3>
          <span className="shrink-0 font-sans text-sm font-semibold tracking-wide text-gold tabular-nums">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="mt-2.5 max-w-[52ch] text-sm leading-relaxed text-cream/55">
          {item.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <DietaryTags item={item} />
          <AddToOrder item={item} label="Add" className="ml-auto" />
        </div>
      </div>
    </motion.li>
  );
}

function FeatureCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex w-[76vw] shrink-0 flex-col border border-gold/12 bg-surface/50 sm:w-[20rem]"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-107">
          <SmartImage src={item.image} alt={item.alt} sizes="(max-width: 640px) 76vw, 20rem" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-ink/85 via-transparent to-transparent"
        />
        {item.tags?.includes('signature') && (
          <span className="absolute top-0 left-0 bg-gold px-3 py-1.5 font-sans text-[0.5625rem] font-bold tracking-[0.2em] text-ink uppercase">
            Signature
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight text-cream">{item.name}</h3>
          <span className="shrink-0 font-sans text-sm font-semibold text-gold tabular-nums">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/55">
          {item.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <DietaryTags item={item} />
          <AddToOrder item={item} label="Add" />
        </div>
      </div>
    </motion.li>
  );
}
