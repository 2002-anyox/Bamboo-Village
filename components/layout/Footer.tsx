'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  navigation,
  secondaryNavigation,
  restaurantConfig,
  formattedAddress,
} from '@/data/restaurant';
import { useWhatsApp } from '@/components/providers/WhatsAppProvider';
import { generalContactMessage } from '@/lib/whatsapp';
import { WhatsAppGlyph } from '@/components/cart/CartDrawer';
import { SocialIcon } from './SocialIcon';
import { Wordmark } from './Wordmark';
import { Reveal } from '@/components/ui/Reveal';

export function Footer() {
  const { send } = useWhatsApp();

  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-ink">
      {/* Moving brand strip */}
      <div
        aria-hidden="true"
        className="flex overflow-hidden border-b border-gold/10 py-6 select-none"
      >
        <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index} className="flex shrink-0 items-center gap-10">
              <span className="font-display text-[clamp(1.75rem,4vw,3rem)] tracking-[0.06em] text-cream/12 uppercase">
                Bamboo Village
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-gold/40" />
              <span className="font-display text-[clamp(1.75rem,4vw,3rem)] tracking-[0.06em] text-gold/20 uppercase italic">
                Good Vibes
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-gold/40" />
            </span>
          ))}
        </div>
        <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index} className="flex shrink-0 items-center gap-10">
              <span className="font-display text-[clamp(1.75rem,4vw,3rem)] tracking-[0.06em] text-cream/12 uppercase">
                Bamboo Village
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-gold/40" />
              <span className="font-display text-[clamp(1.75rem,4vw,3rem)] tracking-[0.06em] text-gold/20 uppercase italic">
                Good Vibes
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-gold/40" />
            </span>
          ))}
        </div>
      </div>

      <div className="shell section-tight">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Identity + contact */}
          <div className="lg:col-span-4">
            <Reveal>
              <Wordmark className="h-11" showTagline />

              <address className="mt-9 flex flex-col gap-4 text-sm leading-relaxed not-italic text-cream/60">
                <span className="max-w-[28ch]">{formattedAddress()}</span>

                <a
                  href={`tel:${restaurantConfig.phone.replace(/[^\d+]/g, '')}`}
                  className="link-underline w-fit text-cream/80 transition-colors duration-300 hover:text-gold"
                >
                  {restaurantConfig.phone}
                </a>

                <a
                  href={`mailto:${restaurantConfig.email}`}
                  className="link-underline w-fit text-cream/80 transition-colors duration-300 hover:text-gold"
                >
                  {restaurantConfig.email}
                </a>
              </address>

              <button
                type="button"
                onClick={() => send(generalContactMessage())}
                className="mt-7 flex items-center gap-2.5 border border-jade/45 bg-jade/10 px-5 py-3.5 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-champagne uppercase transition-colors duration-300 hover:border-jade hover:bg-jade/20"
              >
                <WhatsAppGlyph className="h-4 w-4" />
                Contact us on WhatsApp
              </button>
            </Reveal>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <Reveal delay={0.05}>
              <h2 className="eyebrow mb-6">Explore</h2>
              <ul className="flex flex-col gap-3.5">
                {[...navigation, ...secondaryNavigation].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-cream/65 transition-colors duration-300 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <h2 className="eyebrow mb-6">Opening hours</h2>
              <dl className="flex flex-col gap-4">
                {restaurantConfig.hours.map((entry) => (
                  <div key={entry.days} className="flex flex-col gap-1">
                    <dt className="font-sans text-[0.6875rem] tracking-[0.18em] text-champagne/70 uppercase">
                      {entry.days}
                    </dt>
                    <dd className="text-sm text-cream/60">
                      {entry.hours}
                      {entry.note && (
                        <span className="mt-0.5 block text-[0.6875rem] tracking-[0.12em] text-gold/70 uppercase">
                          {entry.note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Newsletter + social */}
          <div className="lg:col-span-3">
            <Reveal delay={0.15}>
              <h2 className="eyebrow mb-6">Join the village</h2>
              <p className="mb-6 text-sm leading-relaxed text-cream/55">
                New menus, guest DJs and the nights worth planning around — once a
                month, never more.
              </p>

              <NewsletterForm />

              <h2 className="eyebrow mt-10 mb-5">Follow</h2>
              <ul className="flex flex-wrap gap-3">
                {restaurantConfig.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${restaurantConfig.name} on ${social.label}`}
                      className="flex h-11 w-11 items-center justify-center border border-gold/25 text-cream/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => send(generalContactMessage())}
                    aria-label={`Message ${restaurantConfig.name} on WhatsApp`}
                    className="flex h-11 w-11 items-center justify-center border border-gold/25 text-cream/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <SocialIcon name="whatsapp" />
                  </button>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="rule-gold mt-16 mb-8" />

        <div className="flex flex-col gap-4 text-[0.6875rem] tracking-[0.14em] text-cream/35 uppercase md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {restaurantConfig.name}. All rights reserved.
          </p>
          <p className="text-cream/25 normal-case">
            Menu, imagery and contact details shown are placeholder content pending the
            venue&rsquo;s final assets.
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Newsletter capture. Front-end only by design — wire `onSubmit` to your
 * provider (Mailchimp, Klaviyo, Brevo, a Next.js route handler, …) when the
 * venue picks one. See README → "Connecting the forms".
 */
function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'done' | 'error'>('idle');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }

    // TODO: POST `email` to your mailing-list provider here.
    setStatus('done');
    setEmail('');
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>

      <div className="flex">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setStatus('idle');
          }}
          placeholder="your@email.com"
          autoComplete="email"
          aria-invalid={status === 'error' ? true : undefined}
          className="min-w-0 flex-1 border border-gold/20 border-r-0 bg-ink/60 px-4 py-3.5 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 bg-gold px-5 font-sans text-[0.625rem] font-semibold tracking-[0.18em] text-ink uppercase transition-colors duration-300 hover:bg-champagne"
        >
          Join
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={
          status === 'error'
            ? 'text-xs text-ember'
            : status === 'done'
              ? 'text-xs text-jade'
              : 'sr-only'
        }
      >
        {status === 'error' && 'Please enter a valid email address.'}
        {status === 'done' && "You're on the list. Welcome to the village."}
      </p>
    </form>
  );
}
