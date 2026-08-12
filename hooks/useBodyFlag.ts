'use client';

import { useEffect } from 'react';

/**
 * Mirrors a piece of UI state onto a <body> data attribute so unrelated
 * fixed-position chrome can respond in CSS alone — no cross-component
 * plumbing, no context just to move a button out of the way.
 *
 * Used for:
 *   data-overlay   — a fullscreen overlay is open
 *   data-orderbar  — the mobile sticky order bar is showing
 */
export function useBodyFlag(attribute: string, active: boolean): void {
  useEffect(() => {
    if (!active) return;
    document.body.setAttribute(attribute, 'true');
    return () => document.body.removeAttribute(attribute);
  }, [attribute, active]);
}
