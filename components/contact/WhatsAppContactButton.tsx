'use client';

import { useWhatsApp } from '@/components/providers/WhatsAppProvider';
import { generalContactMessage } from '@/lib/whatsapp';
import { WhatsAppGlyph } from '@/components/cart/CartDrawer';
import { restaurantConfig } from '@/data/restaurant';
import { cn } from '@/lib/utils';

/** The standard "Contact us on WhatsApp" action, reused across the site. */
export function WhatsAppContactButton({
  label = 'Contact us on WhatsApp',
  className,
}: {
  label?: string;
  className?: string;
}) {
  const { send } = useWhatsApp();

  return (
    <button
      type="button"
      onClick={() => send(generalContactMessage())}
      aria-label={`Message ${restaurantConfig.name} on WhatsApp`}
      className={cn(
        'flex items-center gap-3 border border-jade/50 bg-jade/10 px-6 py-4',
        'font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-champagne uppercase',
        'transition-colors duration-300 hover:border-jade hover:bg-jade/20',
        className,
      )}
    >
      <WhatsAppGlyph className="h-4 w-4" />
      {label}
    </button>
  );
}
