/**
 * ---------------------------------------------------------------------------
 * WHATSAPP MESSAGE ENGINE
 * ---------------------------------------------------------------------------
 * Every WhatsApp action on the site funnels through this file, and the number
 * itself is read once from `restaurantConfig`. It is never duplicated
 * anywhere else in the codebase.
 *
 * To point the site at a different number, edit ONE of:
 *   • `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`  (preferred)
 *   • `whatsappNumber` in `data/restaurant.ts`
 * ---------------------------------------------------------------------------
 */

import { restaurantConfig, isWhatsAppConfigured } from '@/data/restaurant';
import { formatPrice } from './format';

export type FulfilmentMethod = 'delivery' | 'pickup';

export type WhatsAppOrderLine = {
  name: string;
  quantity: number;
  /** Unit price in UGX. */
  price: number;
};

export type WhatsAppOrderPayload = {
  lines: WhatsAppOrderLine[];
  subtotal: number;
  deliveryFee?: number;
  total: number;
  customerName: string;
  customerPhone: string;
  method: FulfilmentMethod;
  address?: string;
  instructions?: string;
};

export type WhatsAppReservationPayload = {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: string | number;
  occasion?: string;
  requests?: string;
};

export type WhatsAppEnquiryPayload = {
  name: string;
  phone: string;
  email?: string;
  topic: string;
  message?: string;
};

/** Strips everything that is not a digit — wa.me accepts digits only. */
const toDigits = (value: string): string => value.replace(/\D/g, '');

/**
 * Builds the WhatsApp deep link for a message.
 * Returns `null` when no number has been configured yet, which lets the UI
 * fall back to copy-to-clipboard instead of opening a broken link.
 */
export const buildWhatsAppLink = (message: string): string | null => {
  if (!isWhatsAppConfigured()) return null;
  const number = toDigits(restaurantConfig.whatsappNumber);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

/** A blank line, used to keep the templates below readable. */
const BR = '';

const withValue = (value: string | undefined | null): string =>
  value && value.trim().length > 0 ? value.trim() : '—';

// ---------------------------------------------------------------------------
// ORDER
// ---------------------------------------------------------------------------

export const buildOrderMessage = (payload: WhatsAppOrderPayload): string => {
  const {
    lines,
    subtotal,
    deliveryFee = 0,
    total,
    customerName,
    customerPhone,
    method,
    address,
    instructions,
  } = payload;

  const body: string[] = [
    `Hello ${restaurantConfig.name} 👋`,
    BR,
    "I'd like to place an order:",
    BR,
    ...lines.map(
      (line) =>
        `${line.quantity} × ${line.name} — ${formatPrice(line.price * line.quantity)}`,
    ),
    BR,
    `Subtotal: ${formatPrice(subtotal)}`,
  ];

  if (deliveryFee > 0) {
    body.push(`Delivery: ${formatPrice(deliveryFee)}`);
  }

  body.push(
    `Total: ${formatPrice(total)}`,
    BR,
    'Name:',
    withValue(customerName),
    BR,
    'Phone:',
    withValue(customerPhone),
    BR,
    'Delivery/Pickup:',
    method === 'delivery' ? 'Delivery' : 'Pickup',
  );

  if (method === 'delivery') {
    body.push(BR, 'Address:', withValue(address));
  }

  if (instructions && instructions.trim().length > 0) {
    body.push(BR, 'Special instructions:', instructions.trim());
  }

  body.push(BR, 'Thank you!');

  return body.join('\n');
};

// ---------------------------------------------------------------------------
// RESERVATION
// ---------------------------------------------------------------------------

export const buildReservationMessage = (
  payload: WhatsAppReservationPayload,
): string => {
  const body: string[] = [
    `Hello ${restaurantConfig.name} 👋`,
    BR,
    "I'd like to request a reservation:",
    BR,
    `Name: ${withValue(payload.name)}`,
    `Phone: ${withValue(payload.phone)}`,
  ];

  if (payload.email) body.push(`Email: ${payload.email.trim()}`);

  body.push(
    `Date: ${withValue(payload.date)}`,
    `Time: ${withValue(payload.time)}`,
    `Guests: ${withValue(String(payload.guests))}`,
  );

  if (payload.occasion && payload.occasion.trim().length > 0) {
    body.push(`Occasion: ${payload.occasion.trim()}`);
  }

  if (payload.requests && payload.requests.trim().length > 0) {
    body.push(BR, 'Special requests:', payload.requests.trim());
  }

  body.push(BR, 'Thank you!');

  return body.join('\n');
};

// ---------------------------------------------------------------------------
// GENERAL ENQUIRY / EVENT ENQUIRY
// ---------------------------------------------------------------------------

export const buildEnquiryMessage = (payload: WhatsAppEnquiryPayload): string => {
  const body: string[] = [
    `Hello ${restaurantConfig.name} 👋`,
    BR,
    `I'd like to enquire about: ${payload.topic}`,
    BR,
    `Name: ${withValue(payload.name)}`,
    `Phone: ${withValue(payload.phone)}`,
  ];

  if (payload.email) body.push(`Email: ${payload.email.trim()}`);

  if (payload.message && payload.message.trim().length > 0) {
    body.push(BR, 'Message:', payload.message.trim());
  }

  body.push(BR, 'Thank you!');

  return body.join('\n');
};

/** The message behind every plain "Contact us on WhatsApp" button. */
export const generalContactMessage = (): string =>
  `Hello ${restaurantConfig.name} 👋\n\nI'd like to ask a question about`;
