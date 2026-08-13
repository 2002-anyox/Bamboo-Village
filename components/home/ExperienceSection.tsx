'use client';

import { ImageReveal, ParallaxLayer } from '@/components/ui/ImageReveal';
import { Reveal, TextReveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { experienceImages, barImages } from '@/data/images';

const THREADS = ['Dining', 'Cocktails', 'Music', 'Friends', 'Nightlife', 'Events'];

export function ExperienceSection() {
  return (
    // No overflow-hidden here: an ancestor with a clipping overflow silently
    // disables `position: sticky`, which left the copy column scrolling away
    // and the whole lower half of the section empty. The decorative plate
    // below does its own clipping instead.
    <section className="section relative bg-ink" aria-labelledby="experience-heading">
      {/* Full-bleed atmospheric plate, drifting behind the collage */}
      <ParallaxLayer
        intensity={0.5}
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] overflow-hidden opacity-20"
      >
        <div className="relative h-full w-full">
          <ImageReveal
            src={barImages.wide.src}
            alt=""
            focal={barImages.wide.focal}
            sizes="100vw"
            parallax={0}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-linear-to-b from-ink/60 via-ink/85 to-ink" />
        </div>
      </ParallaxLayer>

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-14">
          {/* Copy — sticks while the photographs move past it */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <span className="eyebrow flex items-center gap-4">
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                  The experience
                </span>
              </Reveal>

              <TextReveal
                text={'Come for the food.\nStay for the vibe.'}
                className="display-lg mt-7 font-display text-cream"
                wordClassName=""
              />

              <h2 id="experience-heading" className="sr-only">
                The Bamboo Village experience
              </h2>

              <Reveal delay={0.15}>
                <p className="lede mt-8 max-w-md">
                  Dinner slides into drinks. Drinks slide into a set you did not plan to
                  stay for. Nobody looks at the time, and nobody is asked to leave.
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-3">
                  {THREADS.map((thread) => (
                    <li
                      key={thread}
                      className="border border-gold/20 px-4 py-2.5 font-sans text-[0.625rem] tracking-[0.24em] text-champagne/75 uppercase transition-colors duration-300 hover:border-gold/50 hover:text-gold"
                    >
                      {thread}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-12">
                  <Button href="/gallery" variant="outline" withArrow magnetic>
                    See the village
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Overlapping photography */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="col-span-2 sm:col-span-1">
                <ImageReveal
                  src={experienceImages[0].src}
                  alt={experienceImages[0].alt}
                  focal={experienceImages[0].focal}
                  sizes="(max-width: 640px) 100vw, 32vw"
                  parallax={0.5}
                  className="aspect-3/4 w-full"
                />
              </div>

              <div className="col-span-2 sm:col-span-1 sm:mt-16">
                <ImageReveal
                  src={experienceImages[1].src}
                  alt={experienceImages[1].alt}
                  sizes="(max-width: 640px) 100vw, 32vw"
                  parallax={1.3}
                  delay={0.1}
                  className="aspect-4/5 w-full"
                />
              </div>

              <div className="col-span-2 sm:-mt-8">
                <ImageReveal
                  src={experienceImages[2].src}
                  alt={experienceImages[2].alt}
                  sizes="(max-width: 640px) 100vw, 60vw"
                  parallax={0.8}
                  delay={0.05}
                  className="aspect-16/10 w-full"
                />
              </div>

              <div className="col-span-2 sm:col-span-1 sm:col-start-2">
                <ImageReveal
                  src={experienceImages[3].src}
                  alt={experienceImages[3].alt}
                  sizes="(max-width: 640px) 100vw, 32vw"
                  parallax={1.1}
                  delay={0.12}
                  className="aspect-square w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
