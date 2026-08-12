'use client';

import { motion } from 'framer-motion';
import { restaurantConfig, formattedAddress } from '@/data/restaurant';

/**
 * ---------------------------------------------------------------------------
 * MAP PLACEHOLDER
 * ---------------------------------------------------------------------------
 * A designed stand-in for the real map, so the page never ships with a grey
 * box or a broken embed. It links out to Google Maps and works today.
 *
 * TO DROP IN THE REAL MAP
 * Replace the <div> marked "PLACEHOLDER SURFACE" below with an iframe:
 *
 *   <iframe
 *     title="Bamboo Village on Google Maps"
 *     src="https://www.google.com/maps/embed?pb=…"   // Google Maps → Share → Embed a map
 *     className="absolute inset-0 h-full w-full border-0"
 *     loading="lazy"
 *     referrerPolicy="no-referrer-when-downgrade"
 *     allowFullScreen
 *   />
 *
 * Then set the real coordinates in `data/restaurant.ts` → `address.lat/lng`.
 * ---------------------------------------------------------------------------
 */
export function MapPanel() {
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    restaurantConfig.address.mapsQuery,
  )}`;

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden border border-gold/20 lg:aspect-16/10">
      {/* PLACEHOLDER SURFACE — swap for the Google Maps iframe */}
      <div className="absolute inset-0 bg-linear-to-br from-forest via-surface to-charcoal">
        {/* Street grid */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full text-gold/12"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0v40" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#map-grid)" />
          <path
            d="M-10 210 L150 150 L250 175 L410 110"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            opacity="0.5"
          />
          <path
            d="M120 -10 L165 130 L140 310"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            opacity="0.4"
          />
          <path
            d="M280 -10 L255 160 L300 310"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            opacity="0.3"
          />
          <circle cx="330" cy="60" r="46" fill="currentColor" opacity="0.16" />
          <circle cx="60" cy="255" r="34" fill="currentColor" opacity="0.12" />
        </svg>

        {/* Pin */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
        >
          <span className="relative flex flex-col items-center">
            <span className="absolute -bottom-2 h-3 w-3 rounded-full bg-gold/25 blur-[2px]" />
            <svg
              viewBox="0 0 24 32"
              className="h-11 w-8 text-gold drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.7 0 .6 5.1.6 11.4.6 20 12 32 12 32s11.4-12 11.4-20.6C23.4 5.1 18.3 0 12 0Zm0 15.6a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4Z" />
            </svg>
          </span>
        </motion.div>

        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-gold/25 [animation-duration:3.5s]"
        />
      </div>

      {/* Overlay card */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 bg-ink/85 p-6 backdrop-blur-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-2">Find us</p>
          <p className="max-w-[34ch] text-sm leading-relaxed text-cream/70">
            {formattedAddress()}
          </p>
        </div>

        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden border border-gold/40 px-6 py-3.5 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-cream uppercase"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
          <span className="relative transition-colors duration-300 group-hover:text-ink">
            Get directions
          </span>
        </a>
      </div>

      <span className="absolute top-4 right-4 border border-gold/25 bg-ink/70 px-3 py-1.5 font-sans text-[0.5625rem] tracking-[0.2em] text-champagne/60 uppercase">
        Map placeholder
      </span>
    </div>
  );
}
