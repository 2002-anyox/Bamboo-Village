'use client';

import type { ReactNode } from 'react';
import { Reveal, TextReveal } from './Reveal';
import { cn } from '@/lib/utils';

/**
 * The standard editorial heading block: eyebrow, display headline,
 * optional supporting paragraph and an optional action on the right.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  size = 'lg',
  className,
  titleClassName,
}: {
  eyebrow?: string;
  /** Use \n to force line breaks — each line staggers independently. */
  title: string;
  description?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
  size?: 'lg' | 'xl';
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
        {eyebrow && (
          <Reveal>
            <div
              className={cn(
                'eyebrow mb-6 flex items-center gap-4',
                align === 'center' && 'justify-center',
              )}
            >
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              {eyebrow}
            </div>
          </Reveal>
        )}

        <TextReveal
          text={title}
          className={cn(
            'text-cream',
            size === 'xl' ? 'display-xl' : 'display-lg',
            titleClassName,
          )}
        />

        {description && (
          <Reveal delay={0.15}>
            <p className={cn('lede mt-7', align === 'center' && 'mx-auto max-w-2xl')}>
              {description}
            </p>
          </Reveal>
        )}
      </div>

      {action && (
        <Reveal delay={0.25} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  );
}

/** A short gold-flanked label used to punctuate long pages. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('eyebrow inline-flex items-center gap-3', className)}>
      <span className="h-px w-6 bg-gold/60" aria-hidden="true" />
      {children}
    </span>
  );
}
