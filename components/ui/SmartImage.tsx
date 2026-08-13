'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * ---------------------------------------------------------------------------
 * SmartImage — the single image primitive used everywhere on the site.
 * ---------------------------------------------------------------------------
 * • Fills its parent (the parent supplies the aspect ratio and `overflow-hidden`)
 * • Generates a responsive `srcset` automatically for Unsplash URLs
 * • Lazy-loads by default; pass `priority` for above-the-fold art
 * • Fades in on decode so photographs never "pop"
 * • Falls back to a branded panel if a photo fails to load, so a broken URL
 *   never shows a broken-image icon to a guest
 *
 * Swapping in local photography needs no change here — just point `src` at
 * `/images/your-photo.jpg` in `data/images.ts`.
 * ---------------------------------------------------------------------------
 */

const WIDTHS = [480, 768, 1080, 1440, 1920, 2400];

const isUnsplash = (src: string): boolean => src.includes('images.unsplash.com');

const unsplashUrl = (src: string, width: number): string => {
  const base = src.split('?')[0];
  return `${base}?auto=format&fit=crop&crop=entropy&q=72&w=${width}`;
};

type SmartImageProps = {
  src: string;
  alt: string;
  /** CSS object-position, e.g. '50% 30%'. */
  focal?: string;
  className?: string;
  /** Sizes hint for the browser's srcset selection. */
  sizes?: string;
  /** Skips lazy-loading — use for hero and first-viewport imagery only. */
  priority?: boolean;
  /** Extra classes on the <img> itself (transforms, scale on hover, etc.). */
  imgClassName?: string;
};

export function SmartImage({
  src,
  alt,
  focal,
  className,
  sizes = '100vw',
  priority = false,
  imgClassName,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const remote = isUnsplash(src);
  const resolvedSrc = remote ? unsplashUrl(src, 1440) : src;
  const srcSet = remote
    ? WIDTHS.map((width) => `${unsplashUrl(src, width)} ${width}w`).join(', ')
    : undefined;

  /**
   * Catch images that finished loading before React attached `onLoad`.
   *
   * On a first page load the browser starts fetching from the server-rendered
   * HTML immediately, and often finishes before hydration runs — so the load
   * event fires with no listener attached, `loaded` stays false, and the
   * photograph sits at opacity 0 forever. It only appeared after navigating
   * away and back, because on a client-side render React creates the element
   * with the handler already on it.
   *
   * `complete` is also true for images that failed, where naturalWidth is 0 —
   * that case routes to the fallback panel instead.
   */
  useEffect(() => {
    // Clear first, so a changed src fades in rather than inheriting the
    // previous photograph's state, then re-detect against the new element.
    setLoaded(false);
    setFailed(false);

    const image = imgRef.current;
    if (!image?.complete) return;

    if (image.naturalWidth > 0) setLoaded(true);
    else setFailed(true);
  }, [resolvedSrc]);

  return (
    <span className={cn('relative block h-full w-full overflow-hidden', className)}>
      {/* Base tone: prevents a white flash before the photograph decodes. */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 bg-linear-to-br from-forest via-surface to-charcoal transition-opacity duration-1000',
          loaded && !failed ? 'opacity-0' : 'opacity-100',
        )}
      />

      {failed ? (
        <ImageFallback label={alt} />
      ) : (
        <img
          ref={imgRef}
          src={resolvedSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          // @ts-expect-error — fetchpriority is valid HTML, typing lags behind.
          fetchpriority={priority ? 'high' : undefined}
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ objectPosition: focal ?? '50% 50%' }}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
    </span>
  );
}

/**
 * Shown when a photograph cannot be fetched. Deliberately art-directed so a
 * missing asset still reads as part of the brand rather than as an error.
 */
function ImageFallback({ label }: { label: string }) {
  return (
    <span
      className="@container absolute inset-0 flex flex-col items-center justify-center gap-4 bg-linear-to-br from-forest via-bamboo/40 to-charcoal px-4 text-center"
      role="img"
      aria-label={label}
    >
      <svg
        viewBox="0 0 48 64"
        className="h-9 w-7 text-gold/45 @[10rem]:h-12 @[10rem]:w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <path d="M24 62V10" strokeLinecap="round" />
        <path d="M24 44c0-8-6-13-14-15 0 8 6 13 14 15Z" />
        <path d="M24 30c0-8 6-13 14-15 0 8-6 13-14 15Z" />
        <path d="M24 18c0-6-4.5-10-10-11 0 6 4.5 10 10 11Z" />
      </svg>

      {/* The caption only appears when the frame is big enough to hold it,
          so small thumbnails stay clean instead of overflowing. */}
      <span className="hidden max-w-[24ch] font-sans text-[0.6875rem] leading-relaxed tracking-[0.24em] text-champagne/40 uppercase @[16rem]:line-clamp-3 @[16rem]:block">
        {label}
      </span>
    </span>
  );
}
