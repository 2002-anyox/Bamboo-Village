'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import { Reveal } from '@/components/ui/Reveal';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Cinematic header used at the top of every interior page.
 * Deliberately shorter than the homepage hero so guests reach the content fast.
 */
export function PageHeader({
  eyebrow,
  title,
  accent,
  description,
  image,
  imageAlt,
  focal,
  children,
}: {
  eyebrow: string;
  /** Rendered in the display serif. */
  title: string;
  /** Optional second half, set in gold italic. */
  accent?: string;
  description?: string;
  image: string;
  imageAlt: string;
  focal?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[62svh] items-end overflow-hidden pt-32 lg:min-h-[70svh]"
    >
      <motion.div
        className="absolute inset-0 -z-20"
        style={reduce ? undefined : { y, scale }}
      >
        <SmartImage src={image} alt={imageAlt} focal={focal} sizes="100vw" priority />
      </motion.div>

      <div aria-hidden="true" className="cinema-veil absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-ink/35"
      />
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute -bottom-1/4 -left-1/4 h-[60vh] w-[60vh] rounded-full bg-jade/14 blur-[140px]"
      />

      <motion.div
        style={reduce ? undefined : { y: contentY }}
        className="shell relative pb-14 lg:pb-20"
      >
        <Reveal>
          <span className="eyebrow flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>

        <h1 className="display-xl mt-7 max-w-4xl font-display text-cream">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              initial={reduce ? undefined : { y: '110%' }}
              animate={reduce ? undefined : { y: '0%' }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {title}
            </motion.span>
          </span>

          {accent && (
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                initial={reduce ? undefined : { y: '110%' }}
                animate={reduce ? undefined : { y: '0%' }}
                transition={{ duration: 1.1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="block text-gold italic"
              >
                {accent}
              </motion.span>
            </span>
          )}
        </h1>

        {description && (
          <Reveal delay={0.35}>
            <p className="lede mt-8 max-w-2xl">{description}</p>
          </Reveal>
        )}

        {children && (
          <Reveal delay={0.45}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </motion.div>
    </section>
  );
}
