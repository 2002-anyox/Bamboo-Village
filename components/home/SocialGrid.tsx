'use client';

import { motion } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import { Reveal } from '@/components/ui/Reveal';
import { socialImages } from '@/data/images';
import { restaurantConfig } from '@/data/restaurant';
import { SocialIcon } from '@/components/layout/SocialIcon';

/** The Instagram-style block: nine frames and one invitation. */
export function SocialGrid() {
  const instagram =
    restaurantConfig.socials.find((social) => social.icon === 'instagram') ??
    restaurantConfig.socials[0];

  return (
    <section className="section bg-charcoal" aria-labelledby="social-heading">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="eyebrow flex items-center gap-4">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              {instagram.handle}
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            </span>

            <h2 id="social-heading" className="display-lg font-display text-cream">
              Follow the <span className="text-gold italic">village.</span>
            </h2>

            <p className="lede max-w-xl">
              New plates, guest DJs and the occasional two-in-the-morning photograph
              nobody remembers taking.
            </p>
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
          {socialImages.slice(0, 9).map((image, index) => (
            <motion.li
              key={image.src + index}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: (index % 3) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Follow"
                aria-label={`${image.alt} — view on ${instagram.label}`}
                className="group relative block aspect-square overflow-hidden border border-gold/10"
              >
                <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108">
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    focal={image.focal}
                    sizes="(max-width: 640px) 50vw, 30vw"
                  />
                </div>

                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-forest/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center text-cream opacity-0 transition-all duration-500 group-hover:opacity-100"
                >
                  <SocialIcon name={instagram.icon} className="h-6 w-6" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <Reveal delay={0.15}>
          <div className="mt-12 flex justify-center">
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3.5 overflow-hidden border border-gold/35 px-9 py-5 font-sans text-[0.8125rem] font-semibold tracking-[0.22em] text-cream uppercase"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
              <SocialIcon
                name={instagram.icon}
                className="relative h-4 w-4 transition-colors duration-300 group-hover:text-ink"
              />
              <span className="relative transition-colors duration-300 group-hover:text-ink">
                Follow the village
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
