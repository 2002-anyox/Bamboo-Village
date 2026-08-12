'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SmartImage } from './SmartImage';
import { cn } from '@/lib/utils';

/**
 * Editorial image card. The photograph swells slightly on hover, the veil
 * deepens, and the supporting line rises into place. On touch devices the
 * description is simply always visible — nothing is hidden behind a hover.
 */
export function MediaCard({
  href,
  image,
  alt,
  focal,
  eyebrow,
  title,
  description,
  className,
  aspect = 'aspect-4/5',
  sizes = '(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 24vw',
  index = 0,
}: {
  href: string;
  image: string;
  alt: string;
  focal?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  aspect?: string;
  sizes?: string;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className={cn('group relative', className)}
    >
      <Link
        href={href}
        data-cursor="View"
        className="block focus-visible:outline-offset-4"
        aria-label={`${title}${description ? ` — ${description}` : ''}`}
      >
        <div className={cn('relative overflow-hidden border border-gold/12', aspect)}>
          <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-107">
            <SmartImage src={image} alt={alt} focal={focal} sizes={sizes} />
          </div>

          {/* Legibility veil, deepening on hover */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-ink via-ink/25 to-transparent opacity-85 transition-opacity duration-700 group-hover:opacity-95"
          />

          {/* Gold edge that draws in on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
          />

          <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
            {eyebrow && (
              <span className="eyebrow mb-3 block text-champagne/75">{eyebrow}</span>
            )}

            <h3 className="font-display text-[clamp(1.25rem,2vw,1.75rem)] leading-tight text-cream">
              {title}
            </h3>

            {description && (
              <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-cream/65 lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-hover:opacity-100">
                    {description}
                  </p>
                </div>
              </div>
            )}

            <span
              aria-hidden="true"
              className="mt-5 flex items-center gap-3 font-sans text-[0.625rem] font-semibold tracking-[0.24em] text-gold uppercase"
            >
              View
              <span className="relative block h-px w-6 bg-gold transition-all duration-500 group-hover:w-10">
                <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border-t border-r border-gold" />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
