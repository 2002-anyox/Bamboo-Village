'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import { Button } from '@/components/ui/Button';
import { Lightbox } from '@/components/gallery/Lightbox';
import { featuredGallery } from '@/data/gallery';
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

/**
 * The cinematic rail.
 *
 * On desktop the section pins and the track travels sideways as the guest
 * scrolls down — a full-bleed reel of the venue.
 * On touch and under reduced motion it degrades to a native swipe rail, which
 * is what people expect on a phone anyway.
 */
export function HorizontalGallery() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduceMotion = usePrefersReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const pinned = isDesktop && !reduceMotion;

  return (
    <section
      className="relative bg-charcoal"
      aria-labelledby="gallery-heading"
      id="gallery"
    >
      {/* Heading */}
      <div className="shell section-tight">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow flex items-center gap-4">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              The reel
            </span>
            <h2
              id="gallery-heading"
              className="display-lg mt-6 font-display text-cream"
            >
              Twelve frames <span className="text-gold italic">from the village.</span>
            </h2>
          </div>

          <Button href="/gallery" variant="outline" withArrow magnetic>
            Full gallery
          </Button>
        </div>
      </div>

      {pinned ? (
        <PinnedRail images={featuredGallery} onOpen={setLightboxIndex} />
      ) : (
        <SwipeRail images={featuredGallery} onOpen={setLightboxIndex} />
      )}

      <Lightbox
        images={featuredGallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}

/** Desktop: sticky viewport, horizontally travelling track. */
function PinnedRail({
  images,
  onOpen,
}: {
  images: typeof featuredGallery;
  onOpen: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [travel, setTravel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  /**
   * Measure how far the track actually has to move, rather than guessing.
   *
   * The distance was hard-coded in viewport units, but the frames are sized in
   * vw while the gaps between them are in px — so the two only agreed at one
   * screen width. Everywhere else the track stopped short and the last frames
   * could never be scrolled to at all.
   */
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    };

    measure();
    window.addEventListener('resize', measure);

    // Frame widths depend on viewport height too (they are sized in vh), and
    // fonts/images settle after first paint.
    const settle = setTimeout(measure, 400);

    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(settle);
    };
  }, []);

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(rawX, { stiffness: 90, damping: 26, mass: 0.6 });

  return (
    <div ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.ul
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 px-(--spacing-gutter) will-change-transform"
        >
          {images.map((image, index) => (
            <li
              key={image.id}
              // Sizes vary to give the rail rhythm, but every frame stays
              // centred on one horizontal axis. Mixing self-start and self-end
              // as well gave three different top edges, which reads as
              // misalignment rather than as rhythm.
              className={cn(
                'relative shrink-0',
                index % 3 === 0
                  ? 'h-[66vh] w-[33vw]'
                  : index % 3 === 1
                    ? 'h-[52vh] w-[25vw]'
                    : 'h-[58vh] w-[28vw]',
              )}
            >
              <GalleryFrame image={image} index={index} onOpen={onOpen} />
            </li>
          ))}
        </motion.ul>

        {/* Edge fades keep the rail feeling infinite. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-charcoal to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-charcoal to-transparent"
        />

        <p className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 font-sans text-[0.625rem] tracking-[0.3em] text-cream/30 uppercase">
          Keep scrolling
        </p>
      </div>
    </div>
  );
}

/** Touch and reduced-motion: a plain, swipeable rail. */
function SwipeRail({
  images,
  onOpen,
}: {
  images: typeof featuredGallery;
  onOpen: (index: number) => void;
}) {
  return (
    <div className="pb-16">
      <ul className="rail gap-4 px-(--spacing-gutter) pb-4">
        {images.map((image, index) => (
          <li key={image.id} className="relative h-[52vh] w-[72vw] sm:w-[42vw]">
            <GalleryFrame image={image} index={index} onOpen={onOpen} />
          </li>
        ))}
      </ul>

      <p className="mt-2 px-(--spacing-gutter) font-sans text-[0.625rem] tracking-[0.28em] text-cream/30 uppercase">
        Swipe to explore
      </p>
    </div>
  );
}

function GalleryFrame({
  image,
  index,
  onOpen,
}: {
  image: (typeof featuredGallery)[number];
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      data-cursor="Open"
      aria-label={`Open image: ${image.alt}`}
      className="group relative block h-full w-full overflow-hidden border border-gold/10"
    >
      <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-106">
        <SmartImage
          src={image.src}
          alt={image.alt}
          focal={image.focal}
          sizes="(max-width: 1024px) 72vw, 32vw"
        />
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/10 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-95"
      />

      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-left">
        <span className="translate-y-2 opacity-0 transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <span className="eyebrow block">{image.category}</span>
          <span className="mt-2 block max-w-[30ch] font-display text-base leading-snug text-cream">
            {image.alt}
          </span>
        </span>

        <span className="shrink-0 font-sans text-[0.625rem] tracking-[0.24em] text-champagne/50 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
      </span>
    </button>
  );
}
