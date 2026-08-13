/**
 * ---------------------------------------------------------------------------
 * BAMBOO VILLAGE — CENTRALISED IMAGE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Every photograph on the site is referenced from this file. To swap in the
 * venue's real photography you only ever edit here — never the components.
 *
 * TWO WAYS TO SUPPLY AN IMAGE
 *
 *   1. Local file (recommended for production)
 *      Drop the file in `/public/images/` and reference it:
 *        { src: '/images/hero-terrace.jpg', alt: '…' }
 *
 *   2. Remote URL
 *      Any https URL works. Unsplash URLs get an automatic responsive
 *      `srcset` (see components/ui/SmartImage.tsx).
 *
 * The `alt` text is required — it is read by screen readers and used as the
 * caption in the gallery lightbox, so write it like a photo caption.
 *
 * `focal` maps to CSS object-position and controls the crop on narrow
 * screens. Use it when a subject sits off-centre, e.g. focal: '50% 30%'.
 *
 * NOTE: the URLs below are development placeholders (royalty-free Unsplash
 * photography). Replace them with real Bamboo Village photography before
 * launch. If any remote image fails to load, <SmartImage /> renders a branded
 * fallback panel rather than a broken image.
 * ---------------------------------------------------------------------------
 */

export type ImageAsset = {
  src: string;
  alt: string;
  /** CSS object-position, e.g. '50% 30%'. Defaults to centre. */
  focal?: string;
  /** Optional short caption surfaced in the gallery lightbox. */
  caption?: string;
};

/**
 * Builds a clean Unsplash base URL from a photo id.
 * Exported so `data/menu.ts` and `data/events.ts` can use the same helper.
 * Replace calls to this with your own paths, e.g. '/images/dishes/nyama.jpg'.
 */
export const unsplashPhoto = (id: string): string =>
  `https://images.unsplash.com/photo-${id}`;

const u = unsplashPhoto;

// ---------------------------------------------------------------------------
// HERO + KEY ATMOSPHERE
// ---------------------------------------------------------------------------

export const heroImages = {
  /** Poster frame behind the hero video, and the fallback when video is off. */
  poster: {
    src: u('1414235077428-338989a2e8c0'),
    alt: 'Warm candlelit dining room at Bamboo Village after sunset',
    focal: '50% 45%',
  },
  /** Secondary hero used on interior pages. */
  alternate: {
    src: u('1552566626-52f8b828add9'),
    alt: 'Long communal table laid for dinner under hanging lanterns',
  },
} satisfies Record<string, ImageAsset>;

/**
 * Cinematic background video for the hero.
 * Drop an .mp4 in `/public/video/` and set `src: '/video/hero.mp4'`.
 * Leave `src` as an empty string to disable video entirely — the hero will
 * fall back to the poster image with a slow parallax drift.
 *
 * Recommended encode: 1920×1080, H.264, no audio track, 6–12s loop, < 4 MB.
 */
export const heroVideo = {
  src: '',
  poster: heroImages.poster.src,
  alt: 'Ambient footage of the Bamboo Village bar at night',
};

// ---------------------------------------------------------------------------
// BRAND INTRODUCTION
// ---------------------------------------------------------------------------

export const introImages = {
  primary: {
    src: u('1517248135467-4c7edcad34c4'),
    alt: 'The dining room set for evening service',
    focal: '50% 40%',
  },
  secondary: {
    src: u('1526397751294-331021109fbd'),
    // Described as what it is. The frame beside it is portrait and sized to
    // suit an upright subject like this one.
    alt: 'A bonsai catching the afternoon light',
    focal: '50% 45%',
  },
} satisfies Record<string, ImageAsset>;

// ---------------------------------------------------------------------------
// FOOD
// ---------------------------------------------------------------------------

export const foodImages: ImageAsset[] = [
  {
    src: u('1600891964092-4316c288032e'),
    alt: 'Char-grilled steak resting on a dark slate board',
    focal: '50% 55%',
  },
  {
    src: u('1555939594-58d7cb561ad1'),
    alt: 'Flame-grilled chicken glazed over open coals',
  },
  {
    src: u('1546069901-ba9599a7e63c'),
    alt: 'Shared bowls of grains, greens and roasted vegetables',
  },
  {
    src: u('1551024506-0bccd828d307'),
    alt: 'Layered dessert finished with gold leaf and berries',
  },
];

export const foodDetailImages: ImageAsset[] = [
  { src: u('1565299624946-b28f40a0ae38'), alt: 'Wood-fired flatbread fresh from the oven' },
  { src: u('1540189549336-e6e99c3679fe'), alt: 'Bright garden salad tossed with citrus dressing' },
  { src: u('1467003909585-2f8a72700288'), alt: 'Pan-seared fillet with charred greens' },
  { src: u('1504674900247-0877df9cc836'), alt: 'Slow-cooked beef plated with jus and herbs' },
];

// ---------------------------------------------------------------------------
// DRINKS
// ---------------------------------------------------------------------------

export const drinkImages: ImageAsset[] = [
  {
    src: u('1514362545857-3bc16c4c7d1b'),
    alt: 'Signature cocktail garnished with torched citrus peel',
  },
  {
    src: u('1470158499416-75be9aa0c4db'),
    alt: 'Red wine poured into a wide-bowled glass',
  },
  {
    src: u('1543007630-9710e4a00a20'),
    alt: 'The back bar under warm light',
  },
  {
    src: u('1621263764928-df1444c5e859'),
    alt: 'Passion fruit mocktail over crushed ice',
  },
];

export const barImages = {
  wide: {
    src: u('1514933651103-005eec06c04b'),
    alt: 'The Bamboo Village bar glowing under warm pendant light',
    focal: '50% 45%',
  },
  detail: {
    src: u('1536935338788-846bb9981813'),
    alt: 'Bartender straining a cocktail into a chilled coupe',
  },
} satisfies Record<string, ImageAsset>;

// ---------------------------------------------------------------------------
// THE EXPERIENCE — overlapping editorial composition
// ---------------------------------------------------------------------------

export const experienceImages: ImageAsset[] = [
  {
    src: u('1519671482749-fd09be7ccebf'),
    alt: 'Friends raising glasses across a busy table',
    focal: '50% 35%',
  },
  {
    src: u('1493225457124-a3eb161ffa5f'),
    alt: 'A performer lit through stage smoke',
  },
  {
    src: u('1574096079513-d8259312b785'),
    alt: 'The bar late in the evening',
  },
  {
    src: u('1470229722913-7c0e2dbbafd3'),
    alt: 'Hands in the air as the night peaks on the dance floor',
  },
];

// ---------------------------------------------------------------------------
// INTERIOR / EXTERIOR / DETAIL
// ---------------------------------------------------------------------------

export const venueImages: ImageAsset[] = [
  { src: u('1552566626-52f8b828add9'), alt: 'Dining room dressed for service before doors open' },
  { src: u('1517248135467-4c7edcad34c4'), alt: 'Terrace seating beneath strung festoon lighting' },
  { src: u('1559329007-40df8a9345d8'), alt: 'The room seen from above, mid-service' },
  { src: u('1514933651103-005eec06c04b'), alt: 'The bar, between services' },
];

// ---------------------------------------------------------------------------
// PEOPLE
// ---------------------------------------------------------------------------

export const peopleImages: ImageAsset[] = [
  { src: u('1577219491135-ce391730fb2c'), alt: 'Head chef plating in the pass' },
  { src: u('1510812431401-41d2bd2722f3'), alt: 'Guests mid-toast at the centre table' },
  { src: u('1559329007-40df8a9345d8'), alt: 'Guests toasting at the centre table' },
];

// ---------------------------------------------------------------------------
// SOCIAL GRID — the Instagram-style block on the homepage
// ---------------------------------------------------------------------------

export const socialImages: ImageAsset[] = [
  { src: u('1544145945-f90425340c7e'), alt: 'Cocktails lined up along the pass' },
  { src: u('1555939594-58d7cb561ad1'), alt: 'Skewers turning over open flame' },
  { src: u('1519671482749-fd09be7ccebf'), alt: 'Friends raising a toast' },
  { src: u('1574096079513-d8259312b785'), alt: 'The bar late in the evening' },
  { src: u('1551782450-a2132b4ba21d'), alt: 'Village burger stacked and ready to serve' },
  { src: u('1543007630-9710e4a00a20'), alt: 'The bar lit up on a Friday night' },
  { src: u('1510812431401-41d2bd2722f3'), alt: 'Wine glasses caught mid-toast' },
  { src: u('1533174072545-7a4b6ad7a6c3'), alt: 'Confetti over the dance floor' },
  { src: u('1488477181946-6428a0291777'), alt: 'Dessert plated with berries and cream' },
];

/**
 * Convenience aggregate. Handy if you'd rather work from one object:
 *   import { images } from '@/data/images';
 *   images.food[0].src
 */
export const images = {
  hero: heroImages,
  heroVideo,
  intro: introImages,
  food: foodImages,
  foodDetail: foodDetailImages,
  drinks: drinkImages,
  bar: barImages,
  experience: experienceImages,
  venue: venueImages,
  people: peopleImages,
  social: socialImages,
} as const;
