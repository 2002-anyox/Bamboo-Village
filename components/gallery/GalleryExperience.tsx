'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import { Lightbox } from './Lightbox';
import { galleryImages, galleryFilters, type GalleryCategory } from '@/data/gallery';
import { cn } from '@/lib/utils';

/** Aspect ratio per masonry footprint — what creates the varied rhythm. */
const ASPECT: Record<string, string> = {
  tall: 'aspect-2/3',
  portrait: 'aspect-3/4',
  square: 'aspect-square',
  wide: 'aspect-4/3',
};

export function GalleryExperience() {
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      filter === 'all'
        ? galleryImages
        : galleryImages.filter((image) => image.category === filter),
    [filter],
  );

  return (
    <section className="section bg-ink" aria-label="Photo gallery">
      <div className="shell">
        {/* Filters */}
        <nav aria-label="Filter photographs by category" className="mb-12">
          <ul className="rail gap-2 pb-1 sm:flex-wrap sm:overflow-visible">
            {galleryFilters.map((option) => {
              const active = option.id === filter;
              const total =
                option.id === 'all'
                  ? galleryImages.length
                  : galleryImages.filter((image) => image.category === option.id).length;

              return (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => setFilter(option.id)}
                    aria-pressed={active}
                    className={cn(
                      'group relative flex items-center gap-2.5 border px-5 py-3 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] whitespace-nowrap uppercase transition-all duration-400',
                      active
                        ? 'border-gold bg-gold text-ink'
                        : 'border-gold/20 text-cream/65 hover:border-gold/50 hover:text-cream',
                    )}
                  >
                    {option.label}
                    <span
                      className={cn(
                        'text-[0.5625rem] tabular-nums',
                        active ? 'text-ink/60' : 'text-cream/35',
                      )}
                    >
                      {String(total).padStart(2, '0')}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Masonry */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5"
          >
            {visible.map((image, index) => (
              <motion.figure
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: Math.min(index, 9) * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-4 break-inside-avoid lg:mb-5"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  data-cursor="Open"
                  aria-label={`Open image: ${image.alt}`}
                  className="group relative block w-full overflow-hidden border border-gold/10"
                >
                  <div className={cn('relative w-full', ASPECT[image.span] ?? 'aspect-square')}>
                    <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-106">
                      <SmartImage
                        src={image.src}
                        alt={image.alt}
                        focal={image.focal}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-ink/92 via-ink/10 to-transparent opacity-0 transition-opacity duration-600 group-hover:opacity-100"
                    />

                    <span className="absolute inset-x-0 bottom-0 p-5 text-left">
                      <span className="block translate-y-3 opacity-0 transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="eyebrow block">{image.category}</span>
                        <span className="mt-2 block max-w-[32ch] font-display text-base leading-snug text-cream">
                          {image.alt}
                        </span>
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center border border-cream/40 opacity-0 transition-all duration-500 group-hover:opacity-100"
                    >
                      <span className="relative block h-3 w-3">
                        <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-cream" />
                        <span className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-cream" />
                      </span>
                    </span>
                  </div>
                </button>
              </motion.figure>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="mt-14 max-w-2xl text-sm leading-relaxed text-cream/35">
          Placeholder photography shown for layout. Every image is referenced from a
          single configuration file so the venue&rsquo;s own photographs can be dropped
          in without touching the page.
        </p>
      </div>

      <Lightbox
        images={visible}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
