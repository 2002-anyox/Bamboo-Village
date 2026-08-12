import type { SocialLink } from '@/data/restaurant';

/** Minimal, evenly-weighted glyphs — no third-party icon dependency. */
export function SocialIcon({
  name,
  className = 'h-4 w-4',
}: {
  name: SocialLink['icon'];
  className?: string;
}) {
  switch (name) {
    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.63C16.4 3.56 15.42 3.5 14.3 3.5c-2.36 0-3.98 1.44-3.98 4.09V9.9H7.6V13h2.72v8h3.18Z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M16.5 3h-2.7v12.1a2.55 2.55 0 1 1-2.55-2.55c.24 0 .47.03.7.1V9.9a5.55 5.55 0 1 0 4.55 5.46V9.13a6.3 6.3 0 0 0 3.7 1.2V7.63a3.63 3.63 0 0 1-3.7-3.63V3Z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm4.52 14.15c-.2.58-1.19 1.11-1.67 1.18-.43.06-.97.09-1.56-.1-.36-.11-.82-.26-1.41-.52-2.48-1.07-4.11-3.57-4.23-3.74-.12-.16-1.01-1.34-1.01-2.56 0-1.22.64-1.82.87-2.07.22-.25.49-.31.66-.31.16 0 .33.01.47.01.16.01.36-.05.56.43.2.5.7 1.72.76 1.84.06.13.1.27.02.44-.08.16-.12.26-.25.41-.12.15-.26.33-.37.44-.12.12-.25.25-.11.5.15.25.64 1.06 1.38 1.72.94.84 1.74 1.1 1.99 1.23.25.12.4.1.54-.06.15-.17.63-.73.79-.97.17-.25.33-.21.56-.13.22.09 1.44.69 1.69.81.25.12.42.18.48.29.06.1.06.6-.15 1.18Z" />
        </svg>
      );
    default:
      return null;
  }
}
