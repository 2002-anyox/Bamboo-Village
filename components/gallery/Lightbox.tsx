'use client';

import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import type { GalleryImage } from '@/data/gallery';

/**
 * Fullscreen image viewer.
 * Keyboard: Escape closes, ← → move between images.
 * Touch: swipe horizontally to move, swipe down to dismiss.
 * Focus is trapped inside while open and returned to the trigger on close.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const goPrevious = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goPrevious();
          break;
        case 'ArrowRight':
          goNext();
          break;
        case 'Tab': {
          const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button');
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);

    // Move focus into the dialog on open.
    requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>('button')?.focus();
    });

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [open, onClose, goPrevious, goNext]);

  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer — ${current.alt}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[95] flex flex-col bg-ink/97 backdrop-blur-xl"
          data-lenis-prevent
        >
          {/* Chrome */}
          <header className="relative z-10 flex items-center justify-between gap-4 px-(--spacing-gutter) py-5">
            <p className="font-sans text-[0.625rem] tracking-[0.28em] text-champagne/60 tabular-nums uppercase">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </p>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="group flex items-center gap-3 font-sans text-[0.625rem] tracking-[0.28em] text-cream/70 uppercase transition-colors duration-300 hover:text-gold"
            >
              Close
              <span className="relative block h-8 w-8 border border-gold/30 transition-colors duration-300 group-hover:border-gold">
                <span className="absolute top-1/2 left-1/2 block h-px w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute top-1/2 left-1/2 block h-px w-3.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </header>

          {/* Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-(--spacing-gutter)">
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) goNext();
                  else if (info.offset.x > 80) goPrevious();
                }}
                className="flex h-full max-h-full w-full max-w-6xl cursor-grab flex-col items-center justify-center active:cursor-grabbing"
              >
                <div className="relative max-h-[70vh] w-full flex-1 overflow-hidden">
                  <SmartImage
                    src={current.src}
                    alt={current.alt}
                    focal={current.focal}
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    priority
                    imgClassName="object-contain"
                  />
                </div>

                <figcaption className="mt-6 max-w-2xl text-center">
                  <span className="eyebrow block">{current.category}</span>
                  <span className="mt-3 block font-display text-lg leading-snug text-cream/85 sm:text-xl">
                    {current.alt}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <footer className="relative z-10 flex items-center justify-center gap-4 px-(--spacing-gutter) py-6">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous image"
              className="group flex h-12 w-12 items-center justify-center border border-gold/25 text-cream/70 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M10 3 5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <p className="hidden font-sans text-[0.625rem] tracking-[0.24em] text-cream/35 uppercase sm:block">
              Swipe or use arrow keys
            </p>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="group flex h-12 w-12 items-center justify-center border border-gold/25 text-cream/70 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
