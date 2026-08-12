/**
 * ---------------------------------------------------------------------------
 * BAMBOO VILLAGE — SINGLE SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * This is the ONLY file you need to edit to change the venue's contact
 * details, WhatsApp number, opening hours, social links and address.
 *
 * Values wrapped in [SQUARE BRACKETS] are placeholders. Replace them with the
 * real details — the UI renders them verbatim so unfinished fields are
 * impossible to miss.
 * ---------------------------------------------------------------------------
 */

export type OpeningHour = {
  days: string;
  hours: string;
  /** Shown as an accent line under the hours, e.g. "Kitchen closes 22:30". */
  note?: string;
};

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  /** Key used to pick the icon in <SocialIcon />. */
  icon: 'instagram' | 'facebook' | 'tiktok' | 'whatsapp';
};

export const restaurantConfig = {
  name: 'Bamboo Village',
  shortName: 'BAMBOO VILLAGE',
  tagline: 'Good Food. Good Drinks. Good Vibes.',
  description:
    'Discover Bamboo Village — a vibrant destination for exceptional food, cocktails, music and unforgettable experiences.',

  /**
   * WHATSAPP — full international format, DIGITS ONLY (no "+", spaces or dashes).
   * Example shape for Uganda: 2567XXXXXXXX
   *
   * Preferred: set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local so the number
   * never lives in source control. The env var always wins over this value.
   *
   * While this is left unconfigured, every WhatsApp action still generates the
   * complete message and offers a copy-to-clipboard fallback.
   */
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || 'REPLACE_WITH_WHATSAPP_NUMBER',

  phone: '[PHONE NUMBER]',
  email: '[EMAIL ADDRESS]',
  reservationsEmail: '[RESERVATIONS EMAIL ADDRESS]',

  address: {
    line1: 'Enyau Road',
    line2: '[PLOT / BUILDING]',
    city: 'Arua',
    country: 'Uganda',
    /** Used for the "Get directions" link and the map embed. */
    mapsQuery: 'Bamboo Village Enyau Road Arua Uganda',
    /**
     * These are Arua town centre, NOT the venue itself — accurate enough for
     * a regional pin, but replace with the exact coordinates before launch.
     * Get them from Google Maps: right-click the venue → click the lat/long.
     */
    lat: 3.0201,
    lng: 30.9111,
  },

  currency: {
    code: 'UGX',
    /** Rendered before the amount, e.g. "UGX 35,000". */
    symbol: 'UGX',
  },

  /** Optional flat delivery fee shown in the cart. Set to 0 to hide the line. */
  deliveryFee: 0,

  hours: [
    { days: 'Monday — Thursday', hours: '[11:00 — 23:00]' },
    { days: 'Friday', hours: '[11:00 — 02:00]', note: 'Live DJ from 21:00' },
    { days: 'Saturday', hours: '[11:00 — 03:00]', note: 'Village Nights' },
    { days: 'Sunday', hours: '[11:00 — 22:00]', note: 'Sunday Sessions' },
  ] satisfies OpeningHour[],

  socials: [
    {
      label: 'Instagram',
      handle: '@bamboovillage',
      href: '[INSTAGRAM URL]',
      icon: 'instagram',
    },
    {
      label: 'Facebook',
      handle: 'Bamboo Village',
      href: '[FACEBOOK URL]',
      icon: 'facebook',
    },
    {
      label: 'TikTok',
      handle: '@bamboovillage',
      href: '[TIKTOK URL]',
      icon: 'tiktok',
    },
  ] satisfies SocialLink[],

  /** Canonical origin — also used for sitemap, robots and Open Graph. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bamboovillage.example',
} as const;

export type RestaurantConfig = typeof restaurantConfig;

/** True once a real WhatsApp number has been supplied. */
export const isWhatsAppConfigured = (): boolean => {
  const digits = restaurantConfig.whatsappNumber.replace(/\D/g, '');
  return digits.length >= 8;
};

export const formattedAddress = (): string =>
  [
    restaurantConfig.address.line1,
    restaurantConfig.address.line2,
    restaurantConfig.address.city,
    restaurantConfig.address.country,
  ]
    .filter(Boolean)
    .join(', ');

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Events', href: '/events' },
  { label: 'Reservations', href: '/reservations' },
] as const;

/** Secondary links that live in the footer and the mobile drawer. */
export const secondaryNavigation = [
  { label: 'Order Online', href: '/order' },
  { label: 'Contact', href: '/contact' },
] as const;
