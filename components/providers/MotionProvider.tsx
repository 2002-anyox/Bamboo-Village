'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * One place to honour prefers-reduced-motion for every Framer Motion
 * animation on the site.
 *
 * `reducedMotion="user"` disables transform and layout animation for guests
 * who asked for less movement — values snap to their target instead of
 * travelling — while opacity and colour still resolve, so nothing is left
 * stranded mid-animation or invisible.
 *
 * Doing it here rather than per-component matters: components that branch
 * their MARKUP on a client-only media query render a different tree on the
 * server than on the client, which breaks hydration for precisely the people
 * the accessibility feature is meant to help.
 *
 * CSS keyframe animations are handled separately by the
 * `@media (prefers-reduced-motion: reduce)` block in app/globals.css.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
