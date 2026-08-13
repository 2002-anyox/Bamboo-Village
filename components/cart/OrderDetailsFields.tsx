'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from './CartProvider';
import { TextField, TextAreaField, ToggleGroup } from '@/components/forms/Field';
import type { OrderErrors } from './useOrderCheckout';
import type { FulfilmentMethod } from '@/lib/whatsapp';

/**
 * The customer detail block. Shared by the slide-out cart and the /order page
 * so the two can never drift apart.
 *
 * `density` controls how tightly the fields pack:
 *   'comfortable' — one field per row. For wide, full-width forms.
 *   'compact'     — name and phone share a row, tighter gaps and a shorter
 *                   notes box, so the whole block fits a single screen
 *                   alongside the order summary.
 */
export function OrderDetailsFields({
  errors,
  clearError,
  density = 'comfortable',
}: {
  errors: OrderErrors;
  clearError: (field: keyof OrderErrors) => void;
  density?: 'comfortable' | 'compact';
}) {
  const { details, updateDetails } = useCart();
  const compact = density === 'compact';

  return (
    <div className={compact ? 'flex flex-col gap-3.5' : 'flex flex-col gap-5'}>
      <ToggleGroup<FulfilmentMethod>
        label="Delivery or pickup"
        value={details.method}
        onChange={(method) => {
          updateDetails({ method });
          clearError('address');
        }}
        options={[
          { value: 'delivery', label: 'Delivery', hint: 'To your address' },
          { value: 'pickup', label: 'Pickup', hint: 'Collect from us' },
        ]}
        density={compact ? 'compact' : 'comfortable'}
      />

      {/* Name and phone sit side by side in compact mode — they are short
          fields, and pairing them saves a full row of vertical space. */}
      <div className={compact ? 'grid gap-3.5 sm:grid-cols-2' : 'grid gap-5 sm:grid-cols-2'}>
        <TextField
          label="Your name"
          value={details.name}
          onChange={(name) => {
            updateDetails({ name });
            clearError('name');
          }}
          placeholder="e.g. John Doe"
          autoComplete="name"
          required
          error={errors.name}
          density={compact ? 'compact' : 'comfortable'}
        />

        <TextField
          label="Phone number"
          type="tel"
          inputMode="tel"
          value={details.phone}
          onChange={(phone) => {
            updateDetails({ phone });
            clearError('phone');
          }}
          placeholder="+256 700 000 000"
          autoComplete="tel"
          required
          error={errors.phone}
          density={compact ? 'compact' : 'comfortable'}
        />
      </div>

      <AnimatePresence initial={false}>
        {details.method === 'delivery' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <TextField
              label="Delivery address"
              value={details.address}
              onChange={(address) => {
                updateDetails({ address });
                clearError('address');
              }}
              placeholder="Street, building, and a nearby landmark"
              autoComplete="street-address"
              required
              error={errors.address}
              hint={compact ? undefined : 'A landmark helps our riders find you faster.'}
              density={compact ? 'compact' : 'comfortable'}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <TextAreaField
        label="Special instructions"
        value={details.instructions}
        onChange={(instructions) => updateDetails({ instructions })}
        placeholder={
          compact
            ? 'Allergies, spice level, anything else.'
            : 'Allergies, spice level, or anything else we should know.'
        }
        rows={compact ? 2 : 4}
        density={compact ? 'compact' : 'comfortable'}
      />
    </div>
  );
}
