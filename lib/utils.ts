/** Tiny classname joiner — keeps conditional Tailwind classes readable. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Clamps a number between a minimum and maximum. */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/** Splits a string into words for staggered text-reveal animations. */
export const toWords = (text: string): string[] => text.split(' ');
