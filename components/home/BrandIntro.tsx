'use client';

import { ImageReveal } from '@/components/ui/ImageReveal';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { introImages } from '@/data/images';
import { villageStats } from '@/data/testimonials';

/**
 * The brand introduction — the first section below the hero.
 *
 * Structured exactly like every other section on the site: a SectionHeading
 * (eyebrow, display title, action) across the full width, then a content grid
 * beneath it. It previously rolled its own layout and vertically centred the
 * copy against a much taller photograph, which left a large hole under the
 * headline and meant nothing shared an edge with anything else.
 *
 * The grid is `items-start` on purpose: the copy and the photograph begin on
 * the same line, which is what makes the section read as composed rather than
 * as two things that happen to sit near each other.
 */

/** The three spaces, which is the idea the whole brand rests on. */
const SPACES = [
  { name: 'The Kitchen', line: 'Built around live fire and hardwood coals.' },
  { name: 'The Bar', line: 'Every pour measured, tasted, and adjusted.' },
  { name: 'The Terrace', line: 'Which becomes something else after dark.' },
];

export function BrandIntro() {
  return (
    <section id="intro" className="section relative overflow-hidden bg-ink">
      {/* Soft green wash bleeding in from the left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-1/4 h-[70vh] w-[70vh] rounded-full bg-bamboo/12 blur-[150px]"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Welcome to the village"
          title={'Not just a restaurant.\nA village of experiences.'}
          action={
            <Button href="/about" variant="outline" withArrow magnetic>
              Our story
            </Button>
          }
        />

        <div className="mt-14 grid items-start gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Copy */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="lede">
                Bamboo Village began with a simple idea: build somewhere that behaves
                differently depending on why you came. Somewhere you can take a first
                date, close a deal over lunch, and still find yourself on the floor at
                one in the morning.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-10 flex flex-col">
                {SPACES.map((space) => (
                  <div
                    key={space.name}
                    className="grid grid-cols-[9rem_1fr] gap-4 border-t border-gold/15 py-4"
                  >
                    <dt className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-gold uppercase">
                      {space.name}
                    </dt>
                    <dd className="text-sm leading-relaxed text-cream/60">
                      {space.line}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.26}>
              <p className="mt-8 text-sm leading-relaxed text-cream/45">
                Three spaces, one address — and no obligation to visit them in any
                particular order.
              </p>
            </Reveal>
          </div>

          {/* Photography */}
          <div className="lg:col-span-7">
            <div className="relative">
              <ImageReveal
                src={introImages.primary.src}
                alt={introImages.primary.alt}
                focal={introImages.primary.focal}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="aspect-4/5 w-full sm:aspect-3/2"
              />

              {/* Offset accent plate. Portrait, to suit an upright subject; it
                  sits inside the main photograph's vertical bounds and
                  overlaps only its left edge, so the layering reads as
                  deliberate rather than as something slipping off the corner. */}
              <div className="absolute bottom-6 -left-5 hidden w-40 sm:block lg:bottom-10 lg:-left-10 lg:w-48">
                <ImageReveal
                  src={introImages.secondary.src}
                  alt={introImages.secondary.alt}
                  focal={introImages.secondary.focal}
                  sizes="200px"
                  parallax={1.2}
                  delay={0.2}
                  className="aspect-3/4 w-full border border-gold/25 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
                />
              </div>

              {/* Gold corner rule, anchored to the frame it belongs to. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 -right-4 hidden h-24 w-24 border-t border-r border-gold/45 lg:block"
              />
            </div>
          </div>
        </div>

        {/* Statistics band */}
        <div className="rule-gold mt-20 mb-12 lg:mt-24" />

        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {villageStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-[clamp(3rem,6vw,5rem)] leading-none text-gold">
                    {stat.value}
                    <span className="text-champagne/60">{stat.suffix}</span>
                  </span>
                  <span className="mt-4 block max-w-[16ch] font-sans text-[0.6875rem] tracking-[0.24em] text-cream/45 uppercase">
                    {stat.label}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
