'use client';

import { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Scroll-triggered entrance. The workhorse behind almost every section.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in app/layout.tsx, which strips transform animation and leaves a plain
 * fade. That matters here: these components must render the SAME DOM on the
 * server and the client, so they must never branch their markup on a
 * client-only media query — doing so causes a hydration mismatch for exactly
 * the guests who asked for less movement.
 */

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  down: { x: 0, y: -34 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  direction = 'up',
  once = true,
  amount = 0.25,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  once?: boolean;
  amount?: number;
  as?: 'div' | 'section' | 'li' | 'span' | 'article';
}) {
  const offset = OFFSET[direction];
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

/**
 * Staggered word-by-word headline reveal. Words are wrapped in an
 * overflow-hidden mask so they rise into view rather than fading in place.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}) {
  // Newlines become hard line breaks; each line staggers independently.
  const lines = text.split('\n');

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  let wordIndex = 0;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
    >
      <Tag className={className}>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block overflow-hidden pb-[0.08em]">
            {line.split(' ').map((w) => {
              wordIndex += 1;
              return (
                <motion.span
                  key={`${lineIndex}-${wordIndex}`}
                  variants={word}
                  className={cn('inline-block', wordClassName)}
                >
                  {w}{' '}
                </motion.span>
              );
            })}
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}

/** Staggers a list of children — used for card grids. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.12,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'ul';
}) {
  const Component = Tag === 'ul' ? motion.ul : motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </Component>
  );
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};
