'use client';

import { ImageReveal } from '@/components/ui/ImageReveal';
import { Reveal, TextReveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

export type Story = {
  eyebrow: string;
  title: string;
  accent?: string;
  paragraphs: string[];
  image: { src: string; alt: string; focal?: string };
  /** Optional second, offset photograph. */
  secondary?: { src: string; alt: string; focal?: string };
  /** Pull quote shown under the copy. */
  quote?: string;
};

/**
 * Alternating editorial block used down the About page. Odd blocks flip the
 * photograph to the opposite side, which keeps a long page moving.
 */
export function StorySection({
  story,
  index,
  background = 'ink',
}: {
  story: Story;
  index: number;
  background?: 'ink' | 'charcoal' | 'forest';
}) {
  const flipped = index % 2 === 1;

  return (
    <section
      className={cn(
        'section relative overflow-hidden',
        background === 'ink' && 'bg-ink',
        background === 'charcoal' && 'bg-charcoal',
        background === 'forest' && 'bg-forest',
      )}
      aria-labelledby={`story-${index}`}
    >
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy */}
          <div
            className={cn(
              'lg:col-span-6',
              flipped ? 'lg:order-2 lg:pl-6' : 'lg:order-1 lg:pr-6',
            )}
          >
            <Reveal>
              <span className="eyebrow flex items-center gap-4">
                <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                {story.eyebrow}
              </span>
            </Reveal>

            <TextReveal
              text={story.accent ? `${story.title}\n${story.accent}` : story.title}
              className="display-lg mt-7 font-display text-cream"
            />

            <h2 id={`story-${index}`} className="sr-only">
              {story.title} {story.accent}
            </h2>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-cream/65">
                {story.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            {story.quote && (
              <Reveal delay={0.25}>
                <blockquote className="mt-10 border-l border-gold/50 pl-6">
                  <p className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug text-champagne italic">
                    {story.quote}
                  </p>
                </blockquote>
              </Reveal>
            )}
          </div>

          {/* Photography */}
          <div className={cn('lg:col-span-6', flipped ? 'lg:order-1' : 'lg:order-2')}>
            <div className="relative">
              <ImageReveal
                src={story.image.src}
                alt={story.image.alt}
                focal={story.image.focal}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-4/5 w-full"
              />

              {story.secondary && (
                <div
                  className={cn(
                    'absolute -bottom-10 hidden w-40 sm:block lg:w-48',
                    flipped ? '-right-6 lg:-right-12' : '-left-6 lg:-left-12',
                  )}
                >
                  <ImageReveal
                    src={story.secondary.src}
                    alt={story.secondary.alt}
                    focal={story.secondary.focal}
                    sizes="200px"
                    parallax={1.7}
                    delay={0.2}
                    className="aspect-3/4 w-full border border-gold/20"
                  />
                </div>
              )}

              <span
                aria-hidden="true"
                className={cn(
                  'absolute hidden h-24 w-24 lg:block',
                  flipped
                    ? '-top-4 -left-4 border-t border-l border-gold/45'
                    : '-top-4 -right-4 border-t border-r border-gold/45',
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
