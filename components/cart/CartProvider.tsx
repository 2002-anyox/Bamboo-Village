'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { restaurantConfig } from '@/data/restaurant';
import type { MenuItem } from '@/data/menu';
import type { FulfilmentMethod } from '@/lib/whatsapp';

/**
 * ---------------------------------------------------------------------------
 * Cart state
 * ---------------------------------------------------------------------------
 * Lives at the root layout so the order survives navigation between the menu,
 * the order page and anywhere else on the site. Persisted to localStorage so
 * it also survives a refresh or an accidental tab close.
 * ---------------------------------------------------------------------------
 */

const STORAGE_KEY = 'bamboo-village.cart.v1';
const DETAILS_KEY = 'bamboo-village.details.v1';

export type CartLine = {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  quantity: number;
};

export type CustomerDetails = {
  name: string;
  phone: string;
  method: FulfilmentMethod;
  address: string;
  instructions: string;
};

const EMPTY_DETAILS: CustomerDetails = {
  name: '',
  phone: '',
  method: 'delivery',
  address: '',
  instructions: '',
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  details: CustomerDetails;
  isOpen: boolean;
  /** Increments each time something is added — drives the badge pulse. */
  pulseKey: number;
  /** The id of the item added most recently, for inline confirmations. */
  lastAddedId: string | null;
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  updateDetails: (patch: Partial<CustomerDetails>) => void;
  openCart: () => void;
  closeCart: () => void;
  /** True once localStorage has been read — avoids a hydration mismatch. */
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [details, setDetails] = useState<CustomerDetails>(EMPTY_DETAILS);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const clearLastAdded = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Restore from storage ────────────────────────────────────────────────
  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setLines(parsed);
      }

      const savedDetails = window.localStorage.getItem(DETAILS_KEY);
      if (savedDetails) {
        setDetails({ ...EMPTY_DETAILS, ...JSON.parse(savedDetails) });
      }
    } catch {
      // Corrupt or unavailable storage is not worth breaking the page over.
    }
    setHydrated(true);
  }, []);

  // ── Persist ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage full or blocked — the cart still works for this session */
    }
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(DETAILS_KEY, JSON.stringify(details));
    } catch {
      /* see above */
    }
  }, [details, hydrated]);

  // ── Body scroll lock while the drawer is open ───────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // ── Actions ─────────────────────────────────────────────────────────────
  const addItem = useCallback((item: MenuItem, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((line) => line.id === item.id);
      if (existing) {
        return current.map((line) =>
          line.id === item.id
            ? { ...line, quantity: Math.min(line.quantity + quantity, 99) }
            : line,
        );
      }
      return [
        ...current,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          alt: item.alt,
          quantity: Math.min(quantity, 99),
        },
      ];
    });

    setPulseKey((key) => key + 1);
    setLastAddedId(item.id);

    if (clearLastAdded.current) clearTimeout(clearLastAdded.current);
    clearLastAdded.current = setTimeout(() => setLastAddedId(null), 1800);
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((current) => current.filter((line) => line.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((current) => {
      if (quantity <= 0) return current.filter((line) => line.id !== id);
      return current.map((line) =>
        line.id === id ? { ...line, quantity: Math.min(quantity, 99) } : line,
      );
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const updateDetails = useCallback((patch: Partial<CustomerDetails>) => {
    setDetails((current) => ({ ...current, ...patch }));
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  // ── Derived totals ──────────────────────────────────────────────────────
  const { count, subtotal } = useMemo(
    () =>
      lines.reduce(
        (accumulator, line) => ({
          count: accumulator.count + line.quantity,
          subtotal: accumulator.subtotal + line.price * line.quantity,
        }),
        { count: 0, subtotal: 0 },
      ),
    [lines],
  );

  const deliveryFee =
    details.method === 'delivery' && lines.length > 0 ? restaurantConfig.deliveryFee : 0;

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      details,
      isOpen,
      pulseKey,
      lastAddedId,
      addItem,
      removeItem,
      setQuantity,
      clear,
      updateDetails,
      openCart,
      closeCart,
      hydrated,
    }),
    [
      lines,
      count,
      subtotal,
      deliveryFee,
      details,
      isOpen,
      pulseKey,
      lastAddedId,
      addItem,
      removeItem,
      setQuantity,
      clear,
      updateDetails,
      openCart,
      closeCart,
      hydrated,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return context;
}
