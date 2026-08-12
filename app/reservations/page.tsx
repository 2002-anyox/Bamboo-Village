import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ReservationForm } from '@/components/forms/ReservationForm';
import { Reveal } from '@/components/ui/Reveal';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { venueImages, experienceImages } from '@/data/images';
import { restaurantConfig } from '@/data/restaurant';

export const metadata: Metadata = {
  title: 'Reservations',
  description:
    'Reserve a table at Bamboo Village. Request a booking online or send your details straight to us on WhatsApp.',
  alternates: { canonical: '/reservations' },
  openGraph: {
    title: 'Reservations | Bamboo Village',
    description: 'Request a table online, or reserve in seconds over WhatsApp.',
    url: '/reservations',
  },
};

const GOOD_TO_KNOW = [
  {
    title: 'Holding your table',
    body: 'We hold reserved tables for 15 minutes. Running late? A quick message keeps it yours.',
  },
  {
    title: 'Larger groups',
    body: 'Parties over 12 are handled personally — send an enquiry and we will build something around you.',
  },
  {
    title: 'Walk-ins',
    body: 'Always welcome. The bar and terrace keep space back every night for people who just turn up.',
  },
  {
    title: 'Busy nights',
    body: 'Thursday to Saturday fill early. Book ahead if the evening matters.',
  },
];

export default function ReservationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reservations"
        title="Your table"
        accent="is waiting."
        description="Tell us when, how many, and what the evening is for. We will confirm by phone or WhatsApp, usually within the hour."
        image={venueImages[0].src}
        imageAlt={venueImages[0].alt}
      />

      <section className="section bg-ink" aria-labelledby="reserve-form-heading">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <h2
                  id="reserve-form-heading"
                  className="display-md font-display text-cream"
                >
                  Request a reservation
                </h2>
                <p className="mt-4 mb-10 max-w-xl text-sm leading-relaxed text-cream/55">
                  Marked fields are required. Everything else just helps us set the table
                  properly.
                </p>
              </Reveal>

              <ReservationForm />
            </div>

            {/* Aside */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <ImageReveal
                  src={experienceImages[0].src}
                  alt={experienceImages[0].alt}
                  focal={experienceImages[0].focal}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="aspect-4/5 w-full"
                />

                <div className="mt-10">
                  <h2 className="eyebrow mb-7">Good to know</h2>

                  <dl className="flex flex-col gap-7">
                    {GOOD_TO_KNOW.map((entry, index) => (
                      <Reveal key={entry.title} delay={index * 0.06}>
                        <div className="border-t border-gold/15 pt-5">
                          <dt className="font-display text-lg text-cream">
                            {entry.title}
                          </dt>
                          <dd className="mt-2 text-sm leading-relaxed text-cream/55">
                            {entry.body}
                          </dd>
                        </div>
                      </Reveal>
                    ))}
                  </dl>
                </div>

                <div className="mt-10 border border-gold/15 p-6">
                  <h2 className="eyebrow mb-4">Opening hours</h2>
                  <dl className="flex flex-col gap-3">
                    {restaurantConfig.hours.map((entry) => (
                      <div
                        key={entry.days}
                        className="flex items-baseline justify-between gap-4"
                      >
                        <dt className="font-sans text-[0.6875rem] tracking-[0.16em] text-champagne/70 uppercase">
                          {entry.days}
                        </dt>
                        <dd className="text-right text-sm text-cream/60">
                          {entry.hours}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
