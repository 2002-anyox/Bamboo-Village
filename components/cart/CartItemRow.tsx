'use client';

import { motion } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import { QuantityStepper } from './QuantityStepper';
import { formatPrice } from '@/lib/format';
import type { CartLine } from './CartProvider';

export function CartItemRow({
  line,
  onQuantityChange,
  onRemove,
}: {
  line: CartLine;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 border-b border-gold/10 pb-6"
    >
      <div className="relative h-24 w-20 shrink-0 overflow-hidden">
        <SmartImage src={line.image} alt={line.alt} sizes="80px" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg leading-tight text-cream">{line.name}</h3>
            <p className="mt-1 font-sans text-[0.6875rem] tracking-[0.16em] text-cream/45 uppercase">
              {formatPrice(line.price)} each
            </p>
          </div>

          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${line.name} from your order`}
            className="shrink-0 p-1 text-cream/40 transition-colors duration-200 hover:text-ember focus-visible:text-ember"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <QuantityStepper
            value={line.quantity}
            onChange={onQuantityChange}
            label={line.name}
            size="sm"
            min={0}
          />
          <span className="font-sans text-sm font-semibold tracking-wide text-gold tabular-nums">
            {formatPrice(line.price * line.quantity)}
          </span>
        </div>
      </div>
    </motion.li>
  );
}
