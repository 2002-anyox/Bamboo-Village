/**
 * ---------------------------------------------------------------------------
 * BAMBOO VILLAGE — TESTIMONIALS  (SAMPLE CONTENT)
 * ---------------------------------------------------------------------------
 * ⚠️  Placeholder reviews written for layout purposes. Replace with real,
 *     attributed guest reviews before launch — do not publish these as if
 *     they were genuine.
 * ---------------------------------------------------------------------------
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  /** Shown under the name — role, city or visit context. */
  context: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export const testimonials: Testimonial[] = [
  {
    id: 't-01',
    quote:
      'We came for dinner and left at two in the morning. The grill is genuinely excellent, but it is the room that keeps you — it just keeps getting better as the night goes on.',
    name: '[GUEST NAME]',
    context: 'Saturday dinner, party of six',
    rating: 5,
  },
  {
    id: 't-02',
    quote:
      'The best cocktail list in the city, and it is not close. The smoked negroni arrives at the table like a small piece of theatre and still tastes serious.',
    name: '[GUEST NAME]',
    context: 'Cocktail Nights regular',
    rating: 5,
  },
  {
    id: 't-03',
    quote:
      'We booked the terrace for a birthday of thirty. Everything was handled before we arrived. Not one thing went wrong all evening.',
    name: '[GUEST NAME]',
    context: 'Private event host',
    rating: 5,
  },
  {
    id: 't-04',
    quote:
      'Sunday Sessions have become a habit. Long lunch, live music, nobody rushing you out. It feels like somewhere you belong rather than somewhere you booked.',
    name: '[GUEST NAME]',
    context: 'Sunday regular',
    rating: 5,
  },
];

/** Headline numbers for the statistics band. Replace with real figures. */
export const villageStats = [
  { value: '12', label: 'Years in the village', suffix: '' },
  { value: '48', label: 'Dishes on the fire', suffix: '' },
  { value: '30', label: 'Signature pours', suffix: '+' },
  { value: '3', label: 'Nights that run late', suffix: '' },
];
