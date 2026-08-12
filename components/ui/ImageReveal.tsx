'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SmartImage } from './SmartImage';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * ---------------------------------------------------------------------------
 * ImageReveal — photography that feels alive as you scroll past it.
 * ---------------------------------------------------------------------------
 * Two coordinated effects:
 *   1. A curtain wipes away the first time the frame enters the viewport.
 *   2. The photograph itself sits slightly over-scaled and eases toward its
 *      resting size across the scroll pass, so it never feels static.
 *
 * Both are disabled under prefers-reduced-motion.
 * ---------------------------------------------------------------------------
 */

type ImageRevealProps = {
  src: string;
  alt: string;
  focal?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** 0 disables the scroll-linked drift; 1 is the default intensity. */
  parallax?: number;
  /** Adds a bottom-up gradient so overlaid text stays legible. */
  overlay?: boolean;
  /** Content laid over the photograph (captions, labels). */
  children?: ReactNode;
  /** Delay before the curtain wipes, for staggered groups. */
  delay?: number;
};

export function ImageReveal({
  src,
  alt,
  focal,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  parallax = 1,
  overlay = false,
  children,
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.04, 1.16]);
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-6 * parallax}%`, `${6 * parallax}%`],
  );

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale, y: parallax ? y : undefined }}
      >
        <SmartImage src={src} alt={alt} focal={focal} sizes={sizes} priority={priority} />
      </motion.div>

      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/15 to-transparent"
        />
      )}

      {/* Curtain wipe on first view. Rendered unconditionally so the server
          and client trees match; reduced motion is handled by MotionConfig,
          and the opacity target guarantees it clears either way. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-top bg-ink"
        initial={{ scaleY: 1, opacity: 1 }}
        whileInView={{ scaleY: 0, opacity: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.25, delay, ease: [0.76, 0, 0.24, 1] }}
      />

      {children}
    </div>
  );
}

/**
 * A lighter variant: vertical drift only, no curtain. Used for background
 * plates and the overlapping collage in "The Experience".
 */
export function ParallaxLayer({
  children,
  className,
  intensity = 1,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-10 * intensity}%`, `${10 * intensity}%`],
  );

  return (
    <div ref={ref} className={className}>
      <motion.div className="h-full w-full" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}
