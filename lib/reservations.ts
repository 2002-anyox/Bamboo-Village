/**
 * ---------------------------------------------------------------------------
 * RESERVATIONS
 * ---------------------------------------------------------------------------
 * The form is deliberately decoupled from how a booking is delivered, so the
 * venue can switch systems later without touching any UI.
 *
 * SWITCHING THE DESTINATION — change `reservationConfig.mode`:
 *
 *   'whatsapp'  (default) Opens WhatsApp with the booking details pre-filled.
 *               Zero setup, works today.
 *
 *   'email'     Opens the guest's mail client addressed to
 *               `restaurantConfig.reservationsEmail`.
 *
 *   'api'       POSTs JSON to `reservationConfig.endpoint`. Point this at a
 *               Next.js route handler, your own backend, or the webhook of a
 *               booking platform (OpenTable, SevenRooms, Resy, Eat App…).
 *               The expected response is `{ ok: true }`.
 *
 * The payload shape below is what every mode receives, so a platform
 * integration only ever has to map these fields.
 * ---------------------------------------------------------------------------
 */

import { restaurantConfig } from '@/data/restaurant';
import { buildReservationMessage } from './whatsapp';
import { formatDateLong } from './format';

export type ReservationMode = 'whatsapp' | 'email' | 'api';

export const reservationConfig = {
  mode: 'whatsapp' as ReservationMode,

  /** Used when mode is 'api'. */
  endpoint: '/api/reservations',

  /** Booking window shown in the time dropdown. */
  firstSeating: '11:00',
  lastSeating: '22:30',
  slotMinutes: 30,

  /** Largest party the form will take before asking guests to call. */
  maxPartySize: 12,
} as const;

export type ReservationPayload = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  requests: string;
};

export type ReservationResult =
  | { status: 'sent' }
  | { status: 'whatsapp'; message: string }
  | { status: 'error'; message: string };

/** Generates the seating times offered in the dropdown. */
export const seatingTimes = (): string[] => {
  const toMinutes = (value: string) => {
    const [hours, minutes] = value.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const slots: string[] = [];
  const end = toMinutes(reservationConfig.lastSeating);

  for (
    let minutes = toMinutes(reservationConfig.firstSeating);
    minutes <= end;
    minutes += reservationConfig.slotMinutes
  ) {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    slots.push(`${String(hours).padStart(2, '0')}:${String(rest).padStart(2, '0')}`);
  }

  return slots;
};

/** Party size options, with an overflow entry for large groups. */
export const partySizes = (): { value: string; label: string }[] => {
  const sizes = Array.from({ length: reservationConfig.maxPartySize }, (_, index) => {
    const count = index + 1;
    return { value: String(count), label: `${count} ${count === 1 ? 'guest' : 'guests'}` };
  });

  sizes.push({
    value: `${reservationConfig.maxPartySize}+`,
    label: `${reservationConfig.maxPartySize}+ guests (large group)`,
  });

  return sizes;
};

/**
 * Delivers a reservation request using the configured mode.
 * The caller handles the WhatsApp hand-off so it can reuse the site-wide
 * dispatcher (which copes with an unconfigured number).
 */
export async function submitReservation(
  payload: ReservationPayload,
): Promise<ReservationResult> {
  const message = buildReservationMessage({
    ...payload,
    date: formatDateLong(payload.date) || payload.date,
  });

  switch (reservationConfig.mode) {
    case 'whatsapp':
      return { status: 'whatsapp', message };

    case 'email': {
      const subject = `Reservation request — ${payload.name}, ${payload.guests} on ${formatDateLong(payload.date)}`;
      const href = `mailto:${restaurantConfig.reservationsEmail}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(message)}`;
      window.location.href = href;
      return { status: 'sent' };
    }

    case 'api': {
      try {
        const response = await fetch(reservationConfig.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        return { status: 'sent' };
      } catch {
        // Never leave a guest stranded — fall back to WhatsApp.
        return { status: 'whatsapp', message };
      }
    }

    default:
      return { status: 'error', message: 'Reservation mode is not configured.' };
  }
}
