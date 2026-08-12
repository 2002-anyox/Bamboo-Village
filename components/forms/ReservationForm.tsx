'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TextField, TextAreaField, SelectField } from './Field';
import { WhatsAppGlyph } from '@/components/cart/CartDrawer';
import { useWhatsApp } from '@/components/providers/WhatsAppProvider';
import { buildReservationMessage } from '@/lib/whatsapp';
import { todayISO, formatDateLong } from '@/lib/format';
import {
  partySizes,
  seatingTimes,
  submitReservation,
  type ReservationPayload,
} from '@/lib/reservations';
import { restaurantConfig } from '@/data/restaurant';

type Errors = Partial<Record<keyof ReservationPayload, string>>;

const OCCASIONS = [
  'Just dinner',
  'Birthday',
  'Anniversary',
  'Business',
  'Celebration',
  'Date night',
  'Other',
];

const EMPTY: ReservationPayload = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '19:00',
  guests: '2',
  occasion: 'Just dinner',
  requests: '',
};

export function ReservationForm() {
  const { send } = useWhatsApp();
  const [values, setValues] = useState<ReservationPayload>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<ReservationPayload | null>(null);

  const set = (field: keyof ReservationPayload) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};

    if (values.name.trim().length < 2) next.name = 'Please tell us who the table is for.';
    if (values.phone.replace(/\D/g, '').length < 7)
      next.phone = 'We need a number to confirm your booking.';
    if (values.email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = 'That email address does not look right.';
    if (!values.date) next.date = 'Choose a date.';
    else if (values.date < todayISO()) next.date = 'Please choose today or a later date.';
    if (!values.time) next.time = 'Choose a time.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    const result = await submitReservation(values);
    setSubmitting(false);

    if (result.status === 'whatsapp') {
      send(result.message);
      setConfirmed(values);
      return;
    }

    if (result.status === 'sent') {
      setConfirmed(values);
      return;
    }

    setErrors({ name: result.message });
  };

  const reserveViaWhatsApp = () => {
    if (!validate()) return;
    send(
      buildReservationMessage({
        ...values,
        date: formatDateLong(values.date) || values.date,
      }),
    );
    setConfirmed(values);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {confirmed ? (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="border border-gold/30 bg-forest/40 p-8 text-center lg:p-12"
            role="status"
            aria-live="polite"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/50">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <motion.path
                  d="m5 12.5 4.5 4.5L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              </svg>
            </span>

            <h3 className="mt-7 font-display text-3xl text-cream">Request sent</h3>

            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/60">
              Thank you, {confirmed.name.split(' ')[0] || 'and welcome'}. We have your
              request for{' '}
              <span className="text-champagne">
                {confirmed.guests} {confirmed.guests === '1' ? 'guest' : 'guests'}
              </span>{' '}
              on{' '}
              <span className="text-champagne">{formatDateLong(confirmed.date)}</span> at{' '}
              <span className="text-champagne">{confirmed.time}</span>.
            </p>

            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/45">
              A reservation is confirmed once we reply — usually within the hour during
              opening times. For anything urgent, call us on {restaurantConfig.phone}.
            </p>

            <button
              type="button"
              onClick={() => {
                setConfirmed(null);
                setValues(EMPTY);
              }}
              className="mt-9 border border-gold/35 px-7 py-4 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Make another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Name"
                value={values.name}
                onChange={set('name')}
                placeholder="e.g. John Doe"
                autoComplete="name"
                required
                error={errors.name}
              />

              <TextField
                label="Phone"
                type="tel"
                inputMode="tel"
                value={values.phone}
                onChange={set('phone')}
                placeholder="+256 700 000 000"
                autoComplete="tel"
                required
                error={errors.phone}
              />
            </div>

            <TextField
              label="Email"
              type="email"
              value={values.email}
              onChange={set('email')}
              placeholder="your@email.com"
              autoComplete="email"
              hint="Optional — used only to confirm your booking."
              error={errors.email}
            />

            <div className="grid gap-6 sm:grid-cols-3">
              <TextField
                label="Date"
                type="date"
                value={values.date}
                onChange={set('date')}
                min={todayISO()}
                required
                error={errors.date}
              />

              <SelectField
                label="Time"
                value={values.time}
                onChange={set('time')}
                options={seatingTimes().map((time) => ({ value: time, label: time }))}
                required
                error={errors.time}
              />

              <SelectField
                label="Guests"
                value={values.guests}
                onChange={set('guests')}
                options={partySizes()}
                required
              />
            </div>

            <SelectField
              label="Occasion"
              value={values.occasion}
              onChange={set('occasion')}
              options={OCCASIONS.map((occasion) => ({
                value: occasion,
                label: occasion,
              }))}
            />

            <TextAreaField
              label="Special requests"
              value={values.requests}
              onChange={set('requests')}
              placeholder="Terrace or inside, allergies, a cake, a quiet corner — tell us what matters."
              rows={4}
            />

            <button
              type="submit"
              disabled={submitting}
              className="group relative mt-2 overflow-hidden bg-gold px-8 py-5 font-sans text-[0.75rem] font-semibold tracking-[0.22em] text-ink uppercase transition-colors duration-300 hover:bg-champagne disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Request reservation'}
            </button>

            {/* WhatsApp alternative */}
            <div className="mt-4 flex flex-col items-center gap-4 border-t border-gold/15 pt-8">
              <p className="font-sans text-[0.6875rem] tracking-[0.22em] text-cream/45 uppercase">
                Prefer WhatsApp?
              </p>

              <button
                type="button"
                onClick={reserveViaWhatsApp}
                className="flex w-full items-center justify-center gap-3 border border-jade/50 bg-jade/10 px-7 py-4.5 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-champagne uppercase transition-colors duration-300 hover:border-jade hover:bg-jade/20"
              >
                <WhatsAppGlyph className="h-4 w-4" />
                Reserve via WhatsApp
              </button>

              <p className="text-center text-[0.6875rem] leading-relaxed text-cream/35">
                Fill in the details above and we will build the message for you.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
