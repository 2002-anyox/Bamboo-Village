import { cn } from '@/lib/utils';

/**
 * The Bamboo Village wordmark: a bamboo culm glyph beside stacked type.
 * Drawn in SVG so it stays razor-sharp at any size and inherits currentColor.
 * Replace this component if the venue supplies an official logo file.
 */
export function Wordmark({
  className,
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn('flex items-center gap-3 text-cream', className)}>
      <svg
        viewBox="0 0 28 44"
        className="h-full w-auto shrink-0 text-gold"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d="M14 43V5" strokeLinecap="round" />
        <path d="M14 15.5h-1.2M14 24h-1.2M14 32.5h-1.2" strokeLinecap="round" />
        <path d="M14 30c0-6.4-4.6-10.4-11-12 0 6.4 4.6 10.4 11 12Z" />
        <path d="M14 19c0-6.4 4.6-10.4 11-12 0 6.4-4.6 10.4-11 12Z" />
      </svg>

      <span className="flex h-full flex-col justify-center">
        <span className="font-display text-[0.95em] leading-[0.95] tracking-[0.16em] whitespace-nowrap uppercase">
          Bamboo
        </span>
        <span className="font-display text-[0.95em] leading-[0.95] tracking-[0.16em] whitespace-nowrap text-gold uppercase">
          Village
        </span>
        {showTagline && (
          <span className="mt-1.5 font-sans text-[0.3em] tracking-[0.42em] text-champagne/60 uppercase">
            Restaurant &amp; Bar
          </span>
        )}
      </span>
    </span>
  );
}
