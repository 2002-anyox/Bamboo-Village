'use client';

import Link from 'next/link';
import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * ---------------------------------------------------------------------------
 * Button — one primitive for every call to action on the site.
 * ---------------------------------------------------------------------------
 * Renders as <Link>, <a> or <button> depending on the props supplied, so the
 * markup stays semantic: navigation is a link, an action is a button.
 *
 * Interactions: a fill that sweeps up from the baseline, an arrow that steps
 * forward, and an optional magnetic pull toward the cursor on fine pointers.
 * ---------------------------------------------------------------------------
 */

type Variant = 'primary' | 'outline' | 'solid' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, string> = {
  sm: 'px-5 py-3 text-[0.6875rem] tracking-[0.18em]',
  md: 'px-7 py-4 text-[0.75rem] tracking-[0.2em]',
  lg: 'px-9 py-5 text-[0.8125rem] tracking-[0.22em]',
};

const VARIANTS: Record<Variant, { base: string; fill: string; label: string }> = {
  primary: {
    base: 'bg-gold text-ink hairline-strong',
    fill: 'bg-champagne',
    label: 'text-ink',
  },
  outline: {
    base: 'bg-transparent text-cream hairline-strong',
    fill: 'bg-gold',
    label: 'group-hover:text-ink group-focus-visible:text-ink',
  },
  solid: {
    base: 'bg-bamboo text-cream border border-bamboo',
    fill: 'bg-jade',
    label: 'text-cream',
  },
  ghost: {
    base: 'bg-transparent text-cream/80 border border-transparent hover:text-gold',
    fill: 'bg-transparent',
    label: '',
  },
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Shows a forward arrow that animates on hover. */
  withArrow?: boolean;
  /** Pulls the button gently toward the cursor on fine pointers. */
  magnetic?: boolean;
  fullWidth?: boolean;
  /**
   * Applied to the outer wrapper as well as the control, so responsive width
   * utilities (e.g. 'w-full sm:w-auto') actually take effect.
   */
  wrapperClassName?: string;
};

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
  'aria-label'?: string;
};

type ButtonAsButton = BaseProps & {
  href?: undefined;
  external?: never;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    withArrow = false,
    magnetic = false,
    fullWidth = false,
    wrapperClassName,
  } = props;

  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (event: MouseEvent) => {
    if (!magnetic || reduce || !ref.current) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((event.clientX - (rect.left + rect.width / 2)) * 0.22);
    rawY.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const tone = VARIANTS[variant];

  const classes = cn(
    'group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden',
    'font-sans font-semibold uppercase leading-none',
    'transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
    'disabled:pointer-events-none disabled:opacity-45',
    SIZES[size],
    tone.base,
    fullWidth && 'w-full',
    wrapperClassName,
    className,
  );

  const inner = (
    <>
      {variant !== 'ghost' && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500',
            'ease-[cubic-bezier(0.22,1,0.36,1)]',
            'group-hover:scale-y-100 group-focus-visible:scale-y-100',
            tone.fill,
          )}
        />
      )}
      <span className={cn('relative transition-colors duration-300', tone.label)}>
        {children}
      </span>
      {withArrow && (
        <span
          aria-hidden="true"
          className={cn(
            'relative block h-px w-6 shrink-0 bg-current',
            'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            'group-hover:w-9',
            variant === 'outline' &&
              'group-hover:bg-ink group-focus-visible:bg-ink',
            'after:absolute after:-top-[3px] after:right-0 after:h-[7px] after:w-[7px]',
            'after:rotate-45 after:border-t after:border-r after:border-current',
          )}
        />
      )}
    </>
  );

  const motionStyle = magnetic && !reduce ? { x, y } : undefined;

  if (props.href) {
    const { href, external } = props;

    if (external) {
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={props['aria-label']}
          className={classes}
          style={motionStyle}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {inner}
        </motion.a>
      );
    }

    return (
      <motion.span
        style={motionStyle}
        className={cn('inline-flex', fullWidth && 'w-full', wrapperClassName)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          aria-label={props['aria-label']}
          className={classes}
        >
          {inner}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props['aria-label']}
      className={classes}
      style={motionStyle}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {inner}
    </motion.button>
  );
}
