/**
 * ---------------------------------------------------------------------------
 * BAMBOO VILLAGE — GALLERY DATA  (SAMPLE CONTENT)
 * ---------------------------------------------------------------------------
 * Drives both the homepage horizontal rail and the /gallery masonry page.
 *
 * TO EDIT
 *   • Swap a photo ...... change `src` (local path or https URL)
 *   • Recategorise ...... change `category`
 *   • Change the crop ... `span` controls the masonry footprint:
 *                         'tall' | 'wide' | 'square' | 'portrait'
 *   • Reorder ........... move objects in the array
 *
 * `alt` doubles as the lightbox caption, so write it as a real caption.
 * ---------------------------------------------------------------------------
 */

import { unsplashPhoto as u } from './images';

export type GalleryCategory = 'food' | 'drinks' | 'village' | 'nights' | 'events';

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Masonry footprint on desktop. */
  span: 'tall' | 'wide' | 'square' | 'portrait';
  focal?: string;
};

export const galleryFilters: { id: GalleryCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'village', label: 'Village' },
  { id: 'nights', label: 'Nights' },
  { id: 'events', label: 'Events' },
];

export const galleryImages: GalleryImage[] = [
  {
    id: 'g-01',
    src: u('1600891964092-4316c288032e'),
    alt: 'Sirloin sliced to order and finished with bone marrow butter',
    category: 'food',
    span: 'tall',
    focal: '50% 55%',
  },
  {
    id: 'g-02',
    src: u('1514362545857-3bc16c4c7d1b'),
    alt: 'The passion fruit mojito, built fresh at the bar',
    category: 'drinks',
    span: 'portrait',
  },
  {
    id: 'g-03',
    src: u('1552566626-52f8b828add9'),
    alt: 'The dining room in the last hour before service',
    category: 'village',
    span: 'wide',
  },
  {
    id: 'g-04',
    src: u('1470229722913-7c0e2dbbafd3'),
    alt: 'The floor at midnight, hands in the air',
    category: 'nights',
    span: 'tall',
  },
  {
    id: 'g-05',
    src: u('1555939594-58d7cb561ad1'),
    alt: 'Skewers turning slowly over hardwood coals',
    category: 'food',
    span: 'square',
  },
  {
    id: 'g-06',
    src: u('1536935338788-846bb9981813'),
    alt: 'A negroni finished under smoke at the pass',
    category: 'drinks',
    span: 'portrait',
  },
  {
    id: 'g-07',
    src: u('1517248135467-4c7edcad34c4'),
    alt: 'Terrace tables strung with festoon light',
    category: 'village',
    span: 'wide',
    focal: '50% 40%',
  },
  {
    id: 'g-08',
    src: u('1543007630-9710e4a00a20'),
    alt: 'The bar lit up on a Friday night',
    category: 'nights',
    span: 'square',
  },
  {
    id: 'g-09',
    src: u('1533174072545-7a4b6ad7a6c3'),
    alt: 'Confetti over the dance floor',
    category: 'events',
    span: 'tall',
  },
  {
    id: 'g-10',
    src: u('1559329007-40df8a9345d8'),
    alt: 'The room seen from above, mid-service',
    category: 'village',
    span: 'portrait',
  },
  {
    id: 'g-11',
    src: u('1551024506-0bccd828d307'),
    alt: 'Passion fruit cheesecake, plated to order',
    category: 'food',
    span: 'square',
  },
  {
    id: 'g-12',
    src: u('1493225457124-a3eb161ffa5f'),
    alt: 'A performer lit through stage smoke',
    category: 'events',
    span: 'wide',
  },
  {
    id: 'g-13',
    src: u('1574096079513-d8259312b785'),
    alt: 'The bar at full tilt',
    category: 'nights',
    span: 'portrait',
  },
  {
    id: 'g-14',
    src: u('1467003909585-2f8a72700288'),
    alt: 'Whole tilapia, straight off the fire',
    category: 'food',
    span: 'square',
  },
  {
    id: 'g-15',
    src: u('1544145945-f90425340c7e'),
    alt: 'A round of cocktails leaving the pass together',
    category: 'drinks',
    span: 'wide',
  },
  {
    id: 'g-16',
    src: u('1519671482749-fd09be7ccebf'),
    alt: 'The table that stayed until closing',
    category: 'events',
    span: 'tall',
    focal: '50% 35%',
  },
  {
    id: 'g-17',
    src: u('1577219491135-ce391730fb2c'),
    alt: 'The pass, mid-service',
    category: 'village',
    span: 'square',
  },
  {
    id: 'g-18',
    src: u('1510812431401-41d2bd2722f3'),
    alt: 'Glasses raised, reason optional',
    category: 'drinks',
    span: 'portrait',
  },
];

/** The homepage rail uses a hand-picked, order-sensitive subset. */
export const featuredGallery: GalleryImage[] = [
  'g-01',
  'g-04',
  'g-06',
  'g-03',
  'g-09',
  'g-14',
  'g-13',
  'g-05',
  'g-12',
  'g-02',
  'g-16',
  'g-15',
]
  .map((id) => galleryImages.find((image) => image.id === id))
  .filter((image): image is GalleryImage => Boolean(image));
