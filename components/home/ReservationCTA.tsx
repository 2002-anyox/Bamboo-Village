'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import { Button } from '@/components/ui/Button';
import { TextReveal, Reveal } from '@/components/ui/Reveal';
import { useWhatsApp } from '@/components/providers/WhatsAppProvider';
import { generalContactMessage } from '@/lib/whatsapp';
import { WhatsAppGlyph } from '@/components/cart/CartDrawer';
import { venueImages } from '@/data/images';
import { restaurantConfig } from '@/data/restaurant';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

export function ReservationCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { send } = useWhatsApp();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.06, 1.16]);

  const plate = venueImages[1];

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[85svh] items-center overflow-hidden"
      aria-labelledby="reserve-heading"
    >
      <motion.div
        className="absolute inset-0 -z-20"
        style={reduce ? undefined : { y, scale }}
      >
        <SmartImage
          src={plate.src}
          alt={plate.alt}
          focal={plate.focal}
          sizes="100vw"
        />
      </motion.div>

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/72" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-transparent to-ink/70"
      />

      <div className="shell section relative text-center">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-4">
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            Reservations
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
          </span>
        </Reveal>

        <TextReveal
          text={'Your table\nis waiting.'}
          className="display-xl mx-auto mt-8 max-w-4xl font-display text-cream"
          as="h2"
        />

        <span id="reserve-heading" className="sr-only">
          Reserve a table at {restaurantConfig.name}
        </span>

        <Reveal delay={0.15}>
          <p className="lede mx-auto mt-8 max-w-xl">
            Walk-ins are always welcome, but the good tables go early — especially from
            Thursday onward.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button href="/reservations" size="lg" withArrow magnetic>
              Reserve a table
            </Button>
            <Button href="/order" variant="outline" size="lg" magnetic>
              Order now
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <button
            type="button"
            onClick={() => send(generalContactMessage())}
            className="mt-8 inline-flex items-center gap-2.5 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-champagne/70 uppercase transition-colors duration-300 hover:text-gold"
          >
            <WhatsAppGlyph className="h-4 w-4" />
            Or message us on WhatsApp
          </button>
        </Reveal>
      </div>
    </section>
  );
}
