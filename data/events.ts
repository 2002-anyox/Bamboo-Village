/**
 * ---------------------------------------------------------------------------
 * BAMBOO VILLAGE — EVENTS DATA  (SAMPLE CONTENT)
 * ---------------------------------------------------------------------------
 * ⚠️  Sample listings. Replace with the venue's real programme.
 *
 * TO EDIT
 *   • Change a night ....... edit `title`, `description`, `time`
 *   • Change the rhythm .... `day` is the recurring day label ("Friday")
 *   • One-off event? ....... set `date` to a display string ("14 MAR")
 *   • Swap a photo ......... edit `image`
 *   • Reorder .............. move objects in the array
 * ---------------------------------------------------------------------------
 */

import { unsplashPhoto as u } from './images';

export type VillageEvent = {
  id: string;
  /** Recurring day label, or a short date for one-offs. */
  day: string;
  /** Optional explicit date for one-off events, e.g. '14 MAR'. */
  date?: string;
  title: string;
  description: string;
  time: string;
  location: string;
  image: string;
  alt: string;
  /** Label on the card's call to action. */
  cta: string;
  /** Pre-fills the WhatsApp / reservation message. */
  enquiryTopic: string;
  featured?: boolean;
};

export const events: VillageEvent[] = [
  {
    id: 'ev-live-dj-fridays',
    day: 'Friday',
    title: 'Live DJ Fridays',
    description:
      'The week ends here. Resident DJs move from afrobeats through amapiano to house, the bar runs late and the floor fills by eleven.',
    time: '21:00 — Late',
    location: 'Main floor & terrace',
    image: u('1543007630-9710e4a00a20'),
    alt: 'The bar lit up as the floor fills on a Friday night',
    cta: 'Reserve a table',
    enquiryTopic: 'Live DJ Fridays',
    featured: true,
  },
  {
    id: 'ev-village-saturdays',
    day: 'Saturday',
    title: 'Village Nights',
    description:
      'Our biggest night. Full kitchen until midnight, guest selectors, and the terrace open to the stars until the last table leaves.',
    time: '19:00 — 03:00',
    location: 'Whole venue',
    image: u('1470229722913-7c0e2dbbafd3'),
    alt: 'Crowd with hands raised during Village Nights',
    cta: 'Reserve a table',
    enquiryTopic: 'Village Nights (Saturday)',
    featured: true,
  },
  {
    id: 'ev-sunday-sessions',
    day: 'Sunday',
    title: 'Sunday Sessions',
    description:
      'Slow food, long lunches and live acoustic sets on the terrace. The antidote to Saturday.',
    time: '13:00 — 22:00',
    location: 'Terrace',
    image: u('1517248135467-4c7edcad34c4'),
    alt: 'Long relaxed lunch on the terrace during Sunday Sessions',
    cta: 'Reserve a table',
    enquiryTopic: 'Sunday Sessions',
    featured: true,
  },
  {
    id: 'ev-cocktail-nights',
    day: 'Wednesday',
    title: 'Cocktail Nights',
    description:
      'Our bar team takes over the room. A rotating five-drink list, half-price signatures before nine, and a masterclass at the bar every first Wednesday.',
    time: '18:00 — 00:00',
    location: 'The bar',
    image: u('1536935338788-846bb9981813'),
    alt: 'Bartender finishing a cocktail during Cocktail Nights',
    cta: 'Reserve a spot',
    enquiryTopic: 'Cocktail Nights',
  },
  {
    id: 'ev-live-music',
    day: 'Thursday',
    title: 'Live Music Thursdays',
    description:
      'Rotating live acts — jazz, soul, afro-fusion — playing three metres from your table. No cover, arrive early.',
    time: '20:00 — 23:30',
    location: 'Main floor',
    image: u('1493225457124-a3eb161ffa5f'),
    alt: 'A performer lit through stage smoke',
    cta: 'Reserve a table',
    enquiryTopic: 'Live Music Thursdays',
  },
  {
    id: 'ev-private-events',
    day: 'Any day',
    title: 'Private Events',
    description:
      'Birthdays, corporate evenings, private dinners and celebrations. Semi-private sections or full venue buyouts, with menus built around you.',
    time: 'By arrangement',
    location: 'Private room, terrace or full venue',
    image: u('1519671482749-fd09be7ccebf'),
    alt: 'Friends raising a toast at a private celebration',
    cta: 'Enquire now',
    enquiryTopic: 'Private event',
  },
];

export const featuredEvents = events.filter((event) => event.featured);

/** Spaces offered for private hire, shown on the events page. */
export const privateHireOptions = [
  {
    title: 'Birthdays',
    description: 'Reserved sections, a cake moment handled by us, and the DJ briefed.',
  },
  {
    title: 'Corporate Evenings',
    description: 'Year-end parties and team dinners, with set menus and a private bar tab.',
  },
  {
    title: 'Private Dinners',
    description: 'The chef’s table for up to fourteen, with a menu written for the occasion.',
  },
  {
    title: 'Celebrations',
    description: 'Engagements, graduations, farewells — the room adapts to the reason.',
  },
];
