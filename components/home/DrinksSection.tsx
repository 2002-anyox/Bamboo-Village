'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
import { Button } from '@/components/ui/Button';
import { drinkImages } from '@/data/images';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

const POURS = [
  {
    name: 'Signature Cocktails',
    line: 'Built here, poured nowhere else. Ask the bar what they are proud of tonight.',
    from: 25000,
    href: '/menu#cocktails',
  },
  {
    name: 'Wine',
    line: 'Old world roots, new world sun. By the glass, by the bottle, by the evening.',
    from: 28000,
    href: '/menu#wines',
  },
  {
    name: 'Spirits',
    line: 'Aged rum, single malt, reposado. Neat, on the rocks, or stretched long.',
    from: 26000,
    href: '/menu#spirits',
  },
  {
    name: 'Mocktails',
    line: 'Every bit as considered as the rest of the list. Nobody sits this one out.',
    from: 15000,
    href: '/menu#mocktails',
  },
];

export function DrinksSection() {
  const [active, setActive] = useState(0);
  const image = drinkImages[active % drinkImages.length];

  return (
    <section
      className="section relative overflow-hidden bg-forest"
      aria-labelledby="drinks-heading"
    >
      {/* Emerald and gold light, moving slowly behind everything */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora absolute top-0 -right-1/4 h-[80vh] w-[80vh] rounded-full bg-jade/22 blur-[160px]" />
        <div
          className="aurora absolute bottom-[-20%] left-[-10%] h-[60vh] w-[60vh] rounded-full bg-gold/8 blur-[150px]"
          style={{ animationDelay: '-9s' }}
        />
      </div>

      <div className="shell relative">
        <SectionHeading
          eyebrow="From the bar"
          title={'Raise\nyour glass.'}
          description="A bar team that measures, tastes and adjusts — then does it again. Open until the last table is ready to leave."
          action={
            <Button href="/menu#cocktails" variant="outline" withArrow magnetic>
              See the bar list
            </Button>
          }
        />

        <h2 id="drinks-heading" className="sr-only">
          Drinks at Bamboo Village
        </h2>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Featured pour */}
          <div className="lg:col-span-5">
            <div className="relative aspect-4/5 overflow-hidden border border-gold/20">
              <AnimatePresence mode="sync">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.09 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    focal={image.focal}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </motion.div>
              </AnimatePresence>

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-forest/90 via-transparent to-transparent"
              />

              {/* Liquid line — a slow swell along the base of the frame */}
              <svg
                aria-hidden="true"
                viewBox="0 0 400 60"
                preserveAspectRatio="none"
                className="liquid absolute inset-x-0 bottom-0 h-14 w-full text-gold/25"
              >
                <path
                  d="M0 34c48 0 48-16 96-16s48 16 96 16 48-16 96-16 48 16 96 16 48-16 96-16v46H0Z"
                  fill="currentColor"
                  opacity="0.35"
                />
                <path
                  d="M0 42c48 0 48-14 96-14s48 14 96 14 48-14 96-14 48 14 96 14v18H0Z"
                  fill="currentColor"
                  opacity="0.25"
                />
              </svg>

              <p className="absolute bottom-6 left-6 font-sans text-[0.625rem] tracking-[0.28em] text-champagne/70 uppercase">
                {POURS[active].name}
              </p>
            </div>
          </div>

          {/* The list */}
          <div className="lg:col-span-7">
            <ul className="border-t border-gold/15">
              {POURS.map((pour, index) => {
                const isActive = index === active;

                return (
                  <li key={pour.name} className="border-b border-gold/15">
                    <Link
                      href={pour.href}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onClick={() => setActive(index)}
                      data-cursor="Open"
                      className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 sm:gap-8 sm:py-9"
                    >
                      <span
                        className={cn(
                          'font-sans text-[0.625rem] tracking-[0.24em] tabular-nums transition-colors duration-400',
                          isActive ? 'text-gold' : 'text-cream/30',
                        )}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="min-w-0">
                        <span
                          className={cn(
                            'block font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-tight transition-colors duration-400',
                            isActive ? 'text-gold' : 'text-cream',
                          )}
                        >
                          {pour.name}
                        </span>
                        <span className="mt-2 block max-w-[46ch] text-sm leading-relaxed text-cream/55">
                          {pour.line}
                        </span>
                      </span>

                      <span className="flex flex-col items-end gap-2 text-right">
                        <span className="font-sans text-[0.625rem] tracking-[0.2em] text-cream/40 uppercase">
                          From
                        </span>
                        <span className="font-sans text-sm text-champagne tabular-nums">
                          {formatPrice(pour.from)}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 max-w-[52ch] text-sm leading-relaxed text-cream/45">
              Sample list shown. Prices and pours are illustrative and will be replaced
              with the venue&rsquo;s live bar list.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
