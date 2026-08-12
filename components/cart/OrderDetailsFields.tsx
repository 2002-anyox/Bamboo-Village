'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from './CartProvider';
import { TextField, TextAreaField, ToggleGroup } from '@/components/forms/Field';
import type { OrderErrors } from './useOrderCheckout';
import type { FulfilmentMethod } from '@/lib/whatsapp';

/**
 * The customer detail block. Shared by the slide-out cart and the full
 * /order page so the two can never drift apart.
 */
export function OrderDetailsFields({
  errors,
  clearError,
  compact = false,
}: {
  errors: OrderErrors;
  clearError: (field: keyof OrderErrors) => void;
  compact?: boolean;
}) {
  const { details, updateDetails } = useCart();

  return (
    <div className="flex flex-col gap-5">
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
      />

      <div className={compact ? 'flex flex-col gap-5' : 'grid gap-5 sm:grid-cols-2'}>
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
              hint="A landmark helps our riders find you faster."
            />
          </motion.div>
        )}
      </AnimatePresence>

      <TextAreaField
        label="Special instructions"
        value={details.instructions}
        onChange={(instructions) => updateDetails({ instructions })}
        placeholder="Allergies, spice level, or anything else we should know."
        rows={compact ? 3 : 4}
      />
    </div>
  );
}
