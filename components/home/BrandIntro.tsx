'use client';

import { ImageReveal } from '@/components/ui/ImageReveal';
import { Reveal, TextReveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { introImages } from '@/data/images';
import { villageStats } from '@/data/testimonials';

export function BrandIntro() {
  return (
    <section id="intro" className="section relative overflow-hidden bg-ink">
      {/* Soft green wash bleeding in from the left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-1/4 h-[70vh] w-[70vh] rounded-full bg-bamboo/12 blur-[150px]"
      />

      <div className="shell relative">
        {/* Full-width headline — the line breaks land where they should. */}
        <Reveal>
          <span className="eyebrow flex items-center gap-4">
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            Welcome to the village
          </span>
        </Reveal>

        <TextReveal
          text={'Not just a restaurant.\nA village of experiences.'}
          className="display-xl mt-7 mb-16 font-display text-cream lg:mb-20"
        />

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Copy */}
          <div className="lg:col-span-5 lg:pr-4">
            <Reveal delay={0.15}>
              <div className="flex flex-col gap-5 text-base leading-relaxed text-cream/65">
                <p>
                  Bamboo Village began with a simple idea: build somewhere that
                  behaves differently depending on why you came. Somewhere you can
                  take a first date, close a deal over lunch, and still find yourself
                  on the floor at one in the morning.
                </p>
                <p>
                  Three spaces, one address. A kitchen built around live fire. A bar
                  that treats a mocktail with the same seriousness as a twenty-year
                  whisky. And a terrace that turns into something else entirely once
                  the sun drops.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10">
                <Button href="/about" variant="outline" withArrow magnetic>
                  Our story
                </Button>
              </div>
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
                className="aspect-4/5 w-full sm:aspect-3/2 lg:aspect-4/3"
              />

              {/* Offset secondary plate — sits outside the frame on the left,
                  clear of the copy column on large screens. */}
              <div className="absolute bottom-6 -left-5 hidden w-40 sm:block lg:bottom-10 lg:-left-12 lg:w-48">
                <ImageReveal
                  src={introImages.secondary.src}
                  alt={introImages.secondary.alt}
                  focal={introImages.secondary.focal}
                  sizes="200px"
                  parallax={1.2}
                  delay={0.2}
                  // Portrait, to suit an upright subject. It sits inside the
                  // main photograph's vertical bounds and overlaps only its
                  // left edge, so it reads as a deliberate second plate rather
                  // than something hanging off the corner. The ring lifts it
                  // off the photograph behind it.
                  className="aspect-3/4 w-full border border-gold/25 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
                />
              </div>

              {/* Gold corner rules */}
              <span
                aria-hidden="true"
                className="absolute -top-4 -right-4 hidden h-24 w-24 border-t border-r border-gold/45 lg:block"
              />
            </div>
          </div>
        </div>

        {/* Statistics band */}
        <div className="rule-gold mt-28 mb-12 lg:mt-32" />

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
