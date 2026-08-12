'use client';

import { useCallback, useState } from 'react';
import { useCart } from './CartProvider';
import { useWhatsApp } from '@/components/providers/WhatsAppProvider';
import { buildOrderMessage } from '@/lib/whatsapp';

export type OrderErrors = Partial<Record<'name' | 'phone' | 'address' | 'cart', string>>;

/**
 * Shared checkout behaviour for the cart drawer and the full order page:
 * validates the customer details, builds the WhatsApp message from the live
 * cart, and hands it to the dispatcher.
 */
export function useOrderCheckout() {
  const { lines, subtotal, deliveryFee, total, details } = useCart();
  const { send } = useWhatsApp();
  const [errors, setErrors] = useState<OrderErrors>({});

  const validate = useCallback((): boolean => {
    const next: OrderErrors = {};

    if (lines.length === 0) {
      next.cart = 'Your order is empty — add something from the menu first.';
    }
    if (details.name.trim().length < 2) {
      next.name = 'Please tell us who the order is for.';
    }
    if (details.phone.replace(/\D/g, '').length < 7) {
      next.phone = 'Please enter a phone number we can reach you on.';
    }
    if (details.method === 'delivery' && details.address.trim().length < 6) {
      next.address = 'Please add a delivery address or a nearby landmark.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }, [lines.length, details]);

  const submit = useCallback((): boolean => {
    if (!validate()) return false;

    send(
      buildOrderMessage({
        lines: lines.map((line) => ({
          name: line.name,
          quantity: line.quantity,
          price: line.price,
        })),
        subtotal,
        deliveryFee,
        total,
        customerName: details.name,
        customerPhone: details.phone,
        method: details.method,
        address: details.address,
        instructions: details.instructions,
      }),
    );

    return true;
  }, [validate, send, lines, subtotal, deliveryFee, total, details]);

  const clearError = useCallback((field: keyof OrderErrors) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }, []);

  return { errors, validate, submit, clearError };
}
