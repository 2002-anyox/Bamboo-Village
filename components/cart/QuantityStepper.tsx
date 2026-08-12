'use client';

import { cn } from '@/lib/utils';

/** Accessible −/+ stepper. Thumb-friendly targets on mobile. */
export function QuantityStepper({
  value,
  onChange,
  label,
  size = 'md',
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (next: number) => void;
  /** Item name, used to keep the buttons distinguishable to screen readers. */
  label: string;
  size?: 'sm' | 'md';
  min?: number;
  max?: number;
}) {
  const dimension = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';

  return (
    <div
      className={cn(
        'inline-flex items-center border border-gold/25',
        size === 'sm' ? 'gap-0' : 'gap-0',
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min - 1, value - 1))}
        aria-label={`Decrease quantity of ${label}`}
        className={cn(
          dimension,
          'flex items-center justify-center text-cream/70 transition-colors duration-200',
          'hover:bg-gold hover:text-ink focus-visible:bg-gold focus-visible:text-ink',
        )}
      >
        <span aria-hidden="true" className="block h-px w-3 bg-current" />
      </button>

      <span
        aria-live="polite"
        className={cn(
          'min-w-9 text-center font-sans tabular-nums',
          size === 'sm' ? 'text-sm' : 'text-base',
        )}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label={`Increase quantity of ${label}`}
        className={cn(
          dimension,
          'flex items-center justify-center text-cream/70 transition-colors duration-200',
          'hover:bg-gold hover:text-ink focus-visible:bg-gold focus-visible:text-ink',
        )}
      >
        <span aria-hidden="true" className="relative block h-3 w-3">
          <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-current" />
          <span className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-current" />
        </span>
      </button>
    </div>
  );
}
