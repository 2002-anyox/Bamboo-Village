'use client';

import { useState } from 'react';
import { TextField, TextAreaField, SelectField } from './Field';
import { WhatsAppGlyph } from '@/components/cart/CartDrawer';
import { useWhatsApp } from '@/components/providers/WhatsAppProvider';
import { buildEnquiryMessage } from '@/lib/whatsapp';
import { restaurantConfig } from '@/data/restaurant';

/**
 * General / event enquiry form.
 *
 * Submitting builds a WhatsApp message — the fastest route to a reply for a
 * venue like this. To also deliver enquiries by email or into a CRM, POST the
 * same payload from `handleSubmit` to a route handler.
 * See README → "Connecting the forms".
 */

export type EnquiryFormProps = {
  /** Options for the subject dropdown. Omit for a general enquiry form. */
  topics?: string[];
  defaultTopic?: string;
  heading?: string;
  submitLabel?: string;
};

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'message', string>>;

export function EnquiryForm({
  topics,
  defaultTopic,
  submitLabel = 'Send enquiry',
}: EnquiryFormProps) {
  const { send } = useWhatsApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(defaultTopic ?? topics?.[0] ?? 'General enquiry');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Please tell us your name.';
    if (phone.replace(/\D/g, '').length < 7)
      next.phone = 'Please enter a phone number we can reach you on.';
    if (email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'That email address does not look right.';
    if (message.trim().length < 8)
      next.message = 'A sentence or two about what you have in mind.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    // TODO: also POST this payload to your backend / CRM if you want a record.
    send(buildEnquiryMessage({ name, phone, email, topic, message }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Your name"
          value={name}
          onChange={(value) => {
            setName(value);
            setErrors((e) => ({ ...e, name: undefined }));
          }}
          placeholder="e.g. John Doe"
          autoComplete="name"
          required
          error={errors.name}
        />

        <TextField
          label="Phone number"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(value) => {
            setPhone(value);
            setErrors((e) => ({ ...e, phone: undefined }));
          }}
          placeholder="+256 700 000 000"
          autoComplete="tel"
          required
          error={errors.phone}
        />
      </div>

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(value) => {
          setEmail(value);
          setErrors((e) => ({ ...e, email: undefined }));
        }}
        placeholder="your@email.com"
        autoComplete="email"
        hint="Optional — we will reply on WhatsApp unless you prefer email."
        error={errors.email}
      />

      {topics && topics.length > 0 && (
        <SelectField
          label="What is it about?"
          value={topic}
          onChange={setTopic}
          options={topics.map((option) => ({ value: option, label: option }))}
        />
      )}

      <TextAreaField
        label="Tell us more"
        value={message}
        onChange={(value) => {
          setMessage(value);
          setErrors((e) => ({ ...e, message: undefined }));
        }}
        placeholder="Date, number of guests, the occasion, and anything else that matters."
        rows={5}
        required
        error={errors.message}
      />

      <button
        type="submit"
        className="group relative mt-2 flex items-center justify-center gap-3 overflow-hidden bg-gold px-8 py-5 font-sans text-[0.75rem] font-semibold tracking-[0.2em] text-ink uppercase transition-colors duration-300 hover:bg-champagne"
      >
        <WhatsAppGlyph className="h-4 w-4" />
        {submitLabel}
      </button>

      <p className="text-center text-[0.6875rem] leading-relaxed text-cream/35">
        Sends via WhatsApp to {restaurantConfig.name}. You can edit the message before
        it goes.
      </p>
    </form>
  );
}
