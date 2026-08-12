'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VideoBackground } from '@/components/ui/VideoBackground';
import { Button } from '@/components/ui/Button';
import { heroVideo, heroImages } from '@/data/images';
import { featuredEvents } from '@/data/events';
import { restaurantConfig } from '@/data/restaurant';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

const HEADLINE = ['Good food.', 'Good drinks.', 'Good vibes.'];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // The plate sinks slower than the copy — a shallow, expensive-feeling parallax.
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const tonight = featuredEvents[0];

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden"
      aria-label="Welcome to Bamboo Village"
    >
      {/* Media plate */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={reduce ? undefined : { y: mediaY, scale: mediaScale }}
      >
        <VideoBackground
          src={heroVideo.src}
          poster={heroVideo.poster}
          posterAlt={heroImages.poster.alt}
          posterFocal={heroImages.poster.focal}
          priority
        />
      </motion.div>

      {/* Cinematic grading */}
      <div aria-hidden="true" className="cinema-veil absolute inset-0 -z-10" />

      {/* Floating light — slow, barely there */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora absolute -top-32 -left-24 h-[52vh] w-[52vh] rounded-full bg-jade/16 blur-[130px]" />
        <div
          className="aurora absolute right-[-10%] bottom-0 h-[42vh] w-[42vh] rounded-full bg-gold/10 blur-[140px]"
          style={{ animationDelay: '-8s' }}
        />
      </div>

      {/* Hairline frame — a small luxury cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 -z-10 hidden border border-cream/8 lg:block"
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="shell relative pt-32 pb-10 sm:pb-12 lg:pb-14"
      >
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-6 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
            {restaurantConfig.address.city}, {restaurantConfig.address.country}
          </motion.p>

          <h1 className="display-hero font-display text-cream">
            <span className="sr-only">
              {restaurantConfig.name} — good food, good drinks, good vibes.
            </span>

            {HEADLINE.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  aria-hidden="true"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 1.25,
                    delay: 0.25 + index * 0.13,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={index === 2 ? 'block text-gold italic' : 'block'}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-lg text-base leading-relaxed text-cream/70 sm:text-lg"
          >
            An unforgettable destination for food, cocktails, music and great company.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Button
              href="/menu"
              size="lg"
              withArrow
              magnetic
              wrapperClassName="w-full sm:w-auto"
            >
              Explore menu
            </Button>
            <Button
              href="/reservations"
              variant="outline"
              size="lg"
              magnetic
              wrapperClassName="w-full sm:w-auto"
            >
              Reserve a table
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Baseline strip: scroll cue + what's on tonight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.35 }}
        className="shell relative flex items-end justify-between gap-6 border-t border-cream/10 py-6"
      >
        <a
          href="#intro"
          className="group flex items-center gap-4 text-cream/55 transition-colors duration-300 hover:text-gold"
          aria-label="Scroll to explore"
        >
          <span className="relative block h-10 w-px overflow-hidden bg-cream/20">
            <span className="scroll-cue absolute inset-x-0 top-0 block h-1/2 bg-gold" />
          </span>
          <span className="font-sans text-[0.625rem] tracking-[0.3em] uppercase">
            Scroll
          </span>
        </a>

        {tonight && (
          <Link
            href="/events"
            // Right margin keeps this clear of the floating WhatsApp button.
            className="group hidden max-w-xs items-start gap-4 text-right sm:flex sm:mr-16 lg:mr-20"
          >
            <span className="flex flex-col items-end">
              <span className="eyebrow mb-1.5">This week</span>
              <span className="font-display text-lg leading-tight text-cream transition-colors duration-300 group-hover:text-gold">
                {tonight.title}
              </span>
              <span className="mt-1 font-sans text-[0.6875rem] tracking-[0.16em] text-cream/45 uppercase">
                {tonight.day} · {tonight.time}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="mt-1.5 block h-px w-8 shrink-0 bg-gold/60 transition-all duration-500 group-hover:w-12"
            />
          </Link>
        )}
      </motion.div>
    </section>
  );
}
