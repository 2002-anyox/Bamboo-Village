import { restaurantConfig } from '@/data/restaurant';

/**
 * Formats a whole-number amount as the venue's currency.
 * 35000 → "UGX 35,000"
 */
export const formatPrice = (amount: number): string =>
  `${restaurantConfig.currency.symbol} ${amount.toLocaleString('en-UG')}`;

/** Same as formatPrice but without the currency prefix — for dense tables. */
export const formatAmount = (amount: number): string => amount.toLocaleString('en-UG');

/**
 * Returns today's date as a yyyy-mm-dd string in local time, for use as the
 * `min` attribute on reservation date inputs.
 */
export const todayISO = (): string => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
};

/** "2026-03-14" → "Saturday, 14 March 2026". Falls back to the raw value. */
export const formatDateLong = (iso: string): string => {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
