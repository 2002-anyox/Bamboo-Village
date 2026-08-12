import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { MapPanel } from '@/components/contact/MapPanel';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { WhatsAppContactButton } from '@/components/contact/WhatsAppContactButton';
import { SocialIcon } from '@/components/layout/SocialIcon';
import { Reveal } from '@/components/ui/Reveal';
import { restaurantConfig, formattedAddress } from '@/data/restaurant';
import { venueImages } from '@/data/images';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Find Bamboo Village — address, phone, email, opening hours and directions. Message us on WhatsApp for the fastest reply.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Bamboo Village',
    description: 'Address, hours, directions and the fastest ways to reach us.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Come find"
        accent="the village."
        description="We are easiest to reach on WhatsApp, and we answer the phone during service. Everything else is below."
        image={venueImages[3].src}
        imageAlt={venueImages[3].alt}
      />

      <section className="section bg-ink" aria-labelledby="contact-heading">
        <div className="shell">
          <h2 id="contact-heading" className="sr-only">
            Contact details
          </h2>

          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Details */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col gap-10">
                  <div>
                    <h3 className="eyebrow mb-4">Address</h3>
                    <address className="text-lg leading-relaxed not-italic text-cream/80">
                      {formattedAddress()}
                    </address>
                  </div>

                  <div>
                    <h3 className="eyebrow mb-4">Phone</h3>
                    <a
                      href={`tel:${restaurantConfig.phone.replace(/[^\d+]/g, '')}`}
                      className="link-underline w-fit text-lg text-cream/80 transition-colors duration-300 hover:text-gold"
                    >
                      {restaurantConfig.phone}
                    </a>
                  </div>

                  <div>
                    <h3 className="eyebrow mb-4">Email</h3>
                    <div className="flex flex-col gap-2">
                      <a
                        href={`mailto:${restaurantConfig.email}`}
                        className="link-underline w-fit text-lg text-cream/80 transition-colors duration-300 hover:text-gold"
                      >
                        {restaurantConfig.email}
                      </a>
                      <a
                        href={`mailto:${restaurantConfig.reservationsEmail}`}
                        className="link-underline w-fit text-sm text-cream/50 transition-colors duration-300 hover:text-gold"
                      >
                        {restaurantConfig.reservationsEmail} — bookings
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="eyebrow mb-4">Opening hours</h3>
                    <dl className="flex flex-col gap-4">
                      {restaurantConfig.hours.map((entry) => (
                        <div
                          key={entry.days}
                          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-gold/10 pb-3"
                        >
                          <dt className="font-sans text-[0.6875rem] tracking-[0.2em] text-champagne/70 uppercase">
                            {entry.days}
                          </dt>
                          <dd className="text-sm text-cream/65">
                            {entry.hours}
                            {entry.note && (
                              <span className="ml-3 text-[0.6875rem] tracking-[0.12em] text-gold/70 uppercase">
                                {entry.note}
                              </span>
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div>
                    <h3 className="eyebrow mb-4">WhatsApp</h3>
                    <WhatsAppContactButton />
                  </div>

                  <div>
                    <h3 className="eyebrow mb-4">Social</h3>
                    <ul className="flex flex-wrap gap-3">
                      {restaurantConfig.socials.map((social) => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 border border-gold/25 px-5 py-3.5 text-cream/75 transition-all duration-300 hover:border-gold hover:text-gold"
                          >
                            <SocialIcon name={social.icon} />
                            <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.18em] uppercase">
                              {social.label}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Map + form */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <MapPanel />
              </Reveal>

              <div className="mt-14 border border-gold/20 bg-surface/50 p-7 lg:p-10">
                <Reveal>
                  <h3 className="font-display text-3xl text-cream">Send us a message</h3>
                  <p className="mt-3 mb-9 max-w-lg text-sm leading-relaxed text-cream/55">
                    Questions about the menu, a large booking, press, or working with us —
                    all of it lands in the same place.
                  </p>
                </Reveal>

                <EnquiryForm
                  topics={[
                    'General enquiry',
                    'Reservation',
                    'Private event',
                    'Large group',
                    'Feedback',
                    'Press & partnerships',
                    'Careers',
                  ]}
                  submitLabel="Send message"
                />
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="mt-20 grid gap-4 border-t border-gold/15 pt-12 sm:grid-cols-3">
            {[
              { label: 'Reserve a table', href: '/reservations' },
              { label: 'Order online', href: '/order' },
              { label: 'Host your event', href: '/events' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-4 border border-gold/20 px-6 py-6 transition-colors duration-300 hover:border-gold/60"
              >
                <span className="font-display text-xl text-cream transition-colors duration-300 group-hover:text-gold">
                  {link.label}
                </span>
                <span
                  aria-hidden="true"
                  className="relative block h-px w-7 shrink-0 bg-gold transition-all duration-500 group-hover:w-11"
                >
                  <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border-t border-r border-gold" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
