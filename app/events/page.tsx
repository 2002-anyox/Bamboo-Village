import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { EventCard } from '@/components/events/EventCard';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { Button } from '@/components/ui/Button';
import { events, privateHireOptions } from '@/data/events';
import { experienceImages, venueImages } from '@/data/images';
import { restaurantConfig } from '@/data/restaurant';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Live DJ Fridays, Village Nights, Sunday Sessions and live music at Bamboo Village — plus private hire for birthdays, corporate evenings and celebrations.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Events | Bamboo Village',
    description:
      'Live DJs, live music, Sunday Sessions, and private hire for every kind of celebration.',
    url: '/events',
  },
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@graph': events.map((event) => ({
    '@type': 'Event',
    name: event.title,
    description: event.description,
    eventSchedule: {
      '@type': 'Schedule',
      byDay: event.day,
      startTime: event.time,
    },
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: restaurantConfig.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: restaurantConfig.address.line1,
        addressLocality: restaurantConfig.address.city,
        addressCountry: restaurantConfig.address.country,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: restaurantConfig.name,
      url: restaurantConfig.siteUrl,
    },
  })),
};

export default function EventsPage() {
  const [headline, ...rest] = events;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <PageHeader
        eyebrow="What's on"
        title="There's always"
        accent="something happening."
        description="Four nights a week the room becomes something else entirely. Here is the programme, and how to get a table for it."
        image={experienceImages[1].src}
        imageAlt={experienceImages[1].alt}
      >
        <Button href="/reservations" withArrow magnetic>
          Reserve a table
        </Button>
      </PageHeader>

      {/* Headline event */}
      <section className="section-tight bg-ink" aria-label="This week's headline event">
        <div className="shell">
          <EventCard event={headline} layout="wide" />
        </div>
      </section>

      {/* The rest of the programme */}
      <section className="section bg-charcoal" aria-labelledby="programme-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="The programme"
            title={'Every week,\non repeat.'}
            description="Recurring nights you can plan around. One-off events are announced on Instagram first."
          />

          <h2 id="programme-heading" className="sr-only">
            The weekly programme
          </h2>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Host your event */}
      <section
        className="section relative overflow-hidden bg-forest"
        aria-labelledby="host-heading"
      >
        <div
          aria-hidden="true"
          className="aurora pointer-events-none absolute top-0 -left-1/4 h-[70vh] w-[70vh] rounded-full bg-jade/18 blur-[150px]"
        />

        <div className="shell relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="eyebrow flex items-center gap-4">
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                  Private hire
                </span>

                <h2
                  id="host-heading"
                  className="display-lg mt-7 font-display text-cream"
                >
                  Host your event <span className="text-gold italic">here.</span>
                </h2>

                <p className="lede mt-8 max-w-lg">
                  Reserved sections, semi-private areas or the whole venue. We write the
                  menu around the occasion, brief the bar, and handle the parts you
                  would rather not think about.
                </p>
              </Reveal>

              <dl className="mt-12 grid gap-8 sm:grid-cols-2">
                {privateHireOptions.map((option, index) => (
                  <Reveal key={option.title} delay={index * 0.08}>
                    <div className="border-t border-gold/25 pt-5">
                      <dt className="font-display text-xl text-cream">{option.title}</dt>
                      <dd className="mt-2.5 text-sm leading-relaxed text-cream/55">
                        {option.description}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <div className="mt-14">
                <ImageReveal
                  src={venueImages[1].src}
                  alt={venueImages[1].alt}
                  focal={venueImages[1].focal}
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="aspect-16/9 w-full"
                />
              </div>
            </div>

            {/* Enquiry form */}
            <div className="lg:col-span-6">
              <Reveal delay={0.1}>
                <div className="border border-gold/20 bg-ink/50 p-7 lg:sticky lg:top-28 lg:p-10">
                  <h3 className="font-display text-2xl text-cream">Enquire now</h3>
                  <p className="mt-3 mb-8 text-sm leading-relaxed text-cream/55">
                    Tell us the date and roughly how many of you there are. We usually
                    come back within the day.
                  </p>

                  <EnquiryForm
                    topics={[
                      'Birthday',
                      'Corporate event',
                      'Private dinner',
                      'Party',
                      'Celebration',
                      'Full venue buyout',
                      'Something else',
                    ]}
                    defaultTopic="Birthday"
                    submitLabel="Enquire now"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
