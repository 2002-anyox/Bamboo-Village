'use client';

import { motion } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import { useWhatsApp } from '@/components/providers/WhatsAppProvider';
import { buildEnquiryMessage } from '@/lib/whatsapp';
import type { VillageEvent } from '@/data/events';
import { cn } from '@/lib/utils';

/**
 * Event card. The CTA opens a pre-filled WhatsApp enquiry for that specific
 * night, so a guest never has to explain which event they mean.
 */
export function EventCard({
  event,
  index = 0,
  layout = 'stacked',
}: {
  event: VillageEvent;
  index?: number;
  layout?: 'stacked' | 'wide';
}) {
  const { send } = useWhatsApp();

  const enquire = () =>
    send(
      buildEnquiryMessage({
        name: '',
        phone: '',
        topic: event.enquiryTopic,
        message: `I'd like to know more about ${event.title} (${event.day}, ${event.time}).`,
      }),
    );

  const wide = layout === 'wide';

  return (
    <motion.article
      initial={{ opacity: 0, y: 46 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative flex flex-col border border-gold/12 bg-surface/60',
        wide && 'lg:flex-row',
      )}
    >
      {/* Image */}
      <div
        className={cn(
          'relative overflow-hidden',
          wide ? 'aspect-16/10 lg:aspect-auto lg:w-[46%]' : 'aspect-4/3',
        )}
      >
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-106">
          <SmartImage
            src={event.image}
            alt={event.alt}
            sizes={wide ? '(max-width: 1024px) 100vw, 46vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent"
        />

        {/* Date / day tab */}
        <div className="absolute top-0 left-0 flex flex-col items-center gap-0.5 bg-ink/85 px-4 py-3 backdrop-blur-sm">
          <span className="font-sans text-[0.625rem] font-semibold tracking-[0.22em] text-gold uppercase">
            {event.date ?? event.day}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className={cn('flex flex-1 flex-col p-6 lg:p-8', wide && 'lg:justify-center')}>
        <h3
          className={cn(
            'font-display leading-tight text-cream transition-colors duration-400 group-hover:text-gold',
            wide ? 'text-[clamp(1.75rem,3vw,2.75rem)]' : 'text-2xl',
          )}
        >
          {event.title}
        </h3>

        <p
          className={cn(
            'mt-4 leading-relaxed text-cream/60',
            wide ? 'max-w-[52ch] text-base' : 'text-sm',
          )}
        >
          {event.description}
        </p>

        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <div>
            <dt className="font-sans text-[0.625rem] tracking-[0.22em] text-cream/35 uppercase">
              Time
            </dt>
            <dd className="mt-1 font-sans text-sm text-champagne">{event.time}</dd>
          </div>
          <div>
            <dt className="font-sans text-[0.625rem] tracking-[0.22em] text-cream/35 uppercase">
              Where
            </dt>
            <dd className="mt-1 font-sans text-sm text-champagne">{event.location}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={enquire}
            className="group/cta relative inline-flex items-center gap-3 overflow-hidden border border-gold/35 px-6 py-3.5 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-cream uppercase transition-colors duration-300"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:scale-y-100" />
            <span className="relative transition-colors duration-300 group-hover/cta:text-ink">
              {event.cta}
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
