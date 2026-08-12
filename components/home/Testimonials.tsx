'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { testimonials } from '@/data/testimonials';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

const ROTATE_MS = 7500;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const go = useCallback((next: number) => {
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(() => go(index + 1), ROTATE_MS);
    return () => clearInterval(timer);
  }, [index, paused, reduceMotion, go]);

  const current = testimonials[index];

  return (
    <section
      className="section relative overflow-hidden bg-forest"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute -bottom-1/3 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-jade/15 blur-[150px]"
      />

      <div className="shell relative">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="eyebrow flex items-center gap-4">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              In their words
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            </span>
          </div>
        </Reveal>

        <h2 id="testimonials-heading" className="sr-only">
          What our guests say
        </h2>

        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* Opening quote mark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 font-display text-[10rem] leading-none text-gold/12 select-none"
          >
            &ldquo;
          </span>

          <div className="relative min-h-[24rem] sm:min-h-[22rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.id}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                <Rating value={current.rating} />

                <blockquote className="mt-8">
                  <p className="font-display text-[clamp(1.375rem,3.2vw,2.375rem)] leading-[1.32] text-cream">
                    {current.quote}
                  </p>
                </blockquote>

                <figcaption className="mt-10">
                  <span className="block font-sans text-[0.75rem] font-semibold tracking-[0.24em] text-gold uppercase">
                    {current.name}
                  </span>
                  <span className="mt-2 block font-sans text-[0.6875rem] tracking-[0.18em] text-cream/45 uppercase">
                    {current.context}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous review"
              className="flex h-11 w-11 items-center justify-center border border-gold/25 text-cream/60 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M10 3 5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <ul className="flex items-center gap-2.5" role="tablist" aria-label="Reviews">
              {testimonials.map((testimonial, dotIndex) => (
                <li key={testimonial.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={dotIndex === index}
                    aria-label={`Show review ${dotIndex + 1} of ${testimonials.length}`}
                    onClick={() => go(dotIndex)}
                    className={cn(
                      'block h-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                      dotIndex === index ? 'w-10 bg-gold' : 'w-4 bg-cream/25 hover:bg-cream/50',
                    )}
                  />
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next review"
              className="flex h-11 w-11 items-center justify-center border border-gold/25 text-cream/60 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <p className="mt-8 text-center text-[0.6875rem] tracking-[0.14em] text-cream/25 uppercase">
            Sample reviews — to be replaced with verified guest feedback
          </p>
        </div>
      </div>
    </section>
  );
}

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1.5" role="img" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className={cn('h-4 w-4', index < value ? 'text-gold' : 'text-cream/20')}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.6l2.35 5.28 5.75.55-4.33 3.82 1.27 5.63L10 13.94l-5.04 2.94 1.27-5.63L1.9 7.43l5.75-.55L10 1.6Z" />
        </svg>
      ))}
    </div>
  );
}
