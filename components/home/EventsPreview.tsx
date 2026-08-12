'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/Button';
import { featuredEvents } from '@/data/events';

export function EventsPreview() {
  return (
    <section className="section relative bg-ink" aria-labelledby="events-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-[60vh] w-[60vh] rounded-full bg-ember/8 blur-[160px]"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow="What's on"
          title={"There's always\nsomething happening."}
          description="Three nights a week the room changes character entirely. Here is where to be, and when."
          action={
            <Button href="/events" variant="outline" withArrow magnetic>
              All events
            </Button>
          }
        />

        <h2 id="events-heading" className="sr-only">
          Events at Bamboo Village
        </h2>

        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-3">
          {featuredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
