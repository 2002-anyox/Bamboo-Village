'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { restaurantConfig } from '@/data/restaurant';

/**
 * ---------------------------------------------------------------------------
 * WhatsApp dispatch
 * ---------------------------------------------------------------------------
 * Every WhatsApp action calls `send(message)`.
 *
 *   • Number configured → opens WhatsApp with the message pre-filled.
 *   • Not configured yet → shows the generated message with a one-tap copy,
 *     so the flow is still usable and the message is verifiably correct.
 *
 * Set NEXT_PUBLIC_WHATSAPP_NUMBER (or `whatsappNumber` in data/restaurant.ts)
 * to switch the whole site over to direct sending.
 * ---------------------------------------------------------------------------
 */

type WhatsAppContextValue = {
  send: (message: string) => void;
  configured: boolean;
};

const WhatsAppContext = createContext<WhatsAppContextValue | null>(null);

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const send = useCallback((message: string) => {
    const link = buildWhatsAppLink(message);
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
      return;
    }
    setCopied(false);
    setPending(message);
  }, []);

  const configured = Boolean(buildWhatsAppLink('probe'));

  const close = useCallback(() => setPending(null), []);

  useEffect(() => {
    if (!pending) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [pending, close]);

  const copy = async () => {
    if (!pending) return;
    try {
      await navigator.clipboard.writeText(pending);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const value = useMemo(() => ({ send, configured }), [send, configured]);

  return (
    <WhatsAppContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {pending && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wa-dialog-title"
          >
            {/* Click-away layer. Presentational on purpose: Escape and the
                visible Close button already cover keyboard users, so this
                should not become another tab stop. */}
            <div
              role="presentation"
              onClick={close}
              className="absolute inset-0 bg-ink/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              data-lenis-prevent
              className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto border border-gold/25 bg-surface p-7 sm:p-9"
            >
              <p className="eyebrow mb-4">Your message is ready</p>
              <h2 id="wa-dialog-title" className="display-md mb-4 text-cream">
                Add a WhatsApp number to send this
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-cream/65">
                {restaurantConfig.name} has not had its WhatsApp Business number
                configured yet. The full message below was generated correctly — copy
                it, or set{' '}
                <code className="bg-forest/70 px-1.5 py-0.5 text-[0.75rem] text-gold">
                  NEXT_PUBLIC_WHATSAPP_NUMBER
                </code>{' '}
                to enable one-tap sending.
              </p>

              <pre className="mb-6 max-h-64 overflow-y-auto border border-gold/15 bg-ink/70 p-5 font-sans text-[0.8125rem] leading-relaxed whitespace-pre-wrap text-champagne/90">
                {pending}
              </pre>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={copy}
                  className="flex-1 bg-gold px-6 py-4 text-[0.75rem] font-semibold tracking-[0.2em] text-ink uppercase transition-colors duration-300 hover:bg-champagne"
                >
                  {copied ? 'Copied to clipboard' : 'Copy message'}
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="flex-1 border border-gold/35 px-6 py-4 text-[0.75rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp(): WhatsAppContextValue {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error('useWhatsApp must be used inside <WhatsAppProvider>');
  }
  return context;
}
