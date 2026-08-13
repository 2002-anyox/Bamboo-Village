/**
 * ---------------------------------------------------------------------------
 * BAMBOO VILLAGE — MENU DATA  (SAMPLE CONTENT)
 * ---------------------------------------------------------------------------
 * ⚠️  EVERY ITEM BELOW IS PLACEHOLDER / SAMPLE CONTENT.
 *     Dish names, descriptions and prices are illustrative only and must be
 *     replaced with Bamboo Village's real menu before launch.
 *
 * TO EDIT THE MENU
 *   • Change a price ....... edit `price` (a plain number in UGX)
 *   • Rename a dish ........ edit `name` / `description`
 *   • Swap a photo ......... edit `image` (a local path or any https URL)
 *   • Add a dish ........... copy any object, give it a unique `id`
 *   • Remove a dish ........ delete the object
 *   • Reorder categories ... reorder `menuCategories`
 *   • Hide a category ...... delete it from `menuCategories`
 *
 * `id` values are used as cart keys and deep-link anchors — keep them unique
 * and stable (changing an id drops that item from any saved cart).
 * ---------------------------------------------------------------------------
 */

import { unsplashPhoto as u } from './images';

export type DietaryTag =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'contains-nuts'
  | 'spicy'
  | 'signature';

export const dietaryTagLabels: Record<DietaryTag, { short: string; full: string }> = {
  vegetarian: { short: 'V', full: 'Vegetarian' },
  vegan: { short: 'VG', full: 'Vegan' },
  'gluten-free': { short: 'GF', full: 'Gluten free' },
  'contains-nuts': { short: 'N', full: 'Contains nuts' },
  spicy: { short: 'SP', full: 'Spicy' },
  signature: { short: 'SIG', full: "Chef's signature" },
};

export type MenuCategoryId =
  | 'starters'
  | 'small-plates'
  | 'mains'
  | 'grills'
  | 'sides'
  | 'desserts'
  | 'cocktails'
  | 'wines'
  | 'spirits'
  | 'mocktails'
  | 'soft-drinks';

export type MenuCategory = {
  id: MenuCategoryId;
  name: string;
  /** One-line editorial line shown under the category heading. */
  blurb: string;
  /** Groups the category into a menu section on the menu page. */
  group: 'kitchen' | 'bar';
};

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  /** Whole number in UGX. 35000 renders as "UGX 35,000". */
  price: number;
  image: string;
  /** Alt text for the dish photo. */
  alt: string;
  tags?: DietaryTag[];
  /** Surfaces the item in the "Village favourites" rail. */
  featured?: boolean;
};

export const menuCategories: MenuCategory[] = [
  {
    id: 'starters',
    name: 'Starters',
    blurb: 'Something to open the table with.',
    group: 'kitchen',
  },
  {
    id: 'small-plates',
    name: 'Small Plates',
    blurb: 'Built for the middle of the table.',
    group: 'kitchen',
  },
  {
    id: 'mains',
    name: 'Mains',
    blurb: 'The plates people come back for.',
    group: 'kitchen',
  },
  {
    id: 'grills',
    name: 'Grills',
    blurb: 'Live fire, hardwood coals, patience.',
    group: 'kitchen',
  },
  { id: 'sides', name: 'Sides', blurb: 'Order two. Everyone does.', group: 'kitchen' },
  { id: 'desserts', name: 'Desserts', blurb: 'The reason to stay seated.', group: 'kitchen' },
  {
    id: 'cocktails',
    name: 'Cocktails',
    blurb: 'Our bar team, showing off politely.',
    group: 'bar',
  },
  { id: 'wines', name: 'Wines', blurb: 'Old world roots, new world sun.', group: 'bar' },
  { id: 'spirits', name: 'Spirits', blurb: 'Neat, on the rocks, or long.', group: 'bar' },
  { id: 'mocktails', name: 'Mocktails', blurb: 'Every bit as considered.', group: 'bar' },
  {
    id: 'soft-drinks',
    name: 'Non-Alcoholic',
    blurb: 'Cold, simple, always available.',
    group: 'bar',
  },
];

export const menuItems: MenuItem[] = [
  // ── STARTERS ──────────────────────────────────────────────────────────────
  {
    id: 'st-village-bread',
    category: 'starters',
    name: 'Village Bread & Dips',
    description:
      'Warm charred flatbread with smoked aubergine, whipped feta and chilli oil.',
    price: 18000,
    image: u('1565299624946-b28f40a0ae38'),
    alt: 'Charred flatbread torn beside three dipping bowls',
    tags: ['vegetarian'],
  },
  {
    id: 'st-pepper-soup',
    category: 'starters',
    name: 'Fisherman’s Pepper Soup',
    description:
      'Clear tilapia broth with scotch bonnet, ginger and fresh herbs. Served steaming.',
    price: 24000,
    image: u('1547592180-85f173990554'),
    alt: 'Bowl of clear pepper broth scattered with herbs',
    tags: ['spicy', 'gluten-free'],
  },
  {
    id: 'st-goat-samosa',
    category: 'starters',
    name: 'Smoked Goat Samosas',
    description: 'Four crisp pastries, slow-cooked goat, tamarind and red onion salad.',
    price: 22000,
    image: u('1601050690597-df0568f70950'),
    alt: 'Golden triangular samosas stacked on a dark plate',
    featured: true,
  },
  {
    id: 'st-garden-salad',
    category: 'starters',
    name: 'Garden & Citrus',
    description: 'Leaves from the hills, orange segments, toasted groundnuts, lime dressing.',
    price: 20000,
    image: u('1540189549336-e6e99c3679fe'),
    alt: 'Bright leaf salad tossed with citrus segments',
    tags: ['vegan', 'contains-nuts', 'gluten-free'],
  },

  // ── SMALL PLATES ──────────────────────────────────────────────────────────
  {
    id: 'sp-chicken-wings',
    category: 'small-plates',
    name: 'Village Wings',
    description: 'Six wings, honey-chilli glaze, sesame and spring onion. Sticky by design.',
    price: 28000,
    image: u('1608039755401-742074f0548d'),
    alt: 'Glazed chicken wings piled high and glossy',
    tags: ['spicy'],
    featured: true,
  },
  {
    id: 'sp-prawn-skewers',
    category: 'small-plates',
    name: 'Coconut Prawn Skewers',
    description: 'Grilled tiger prawns, coconut and lemongrass butter, charred lime.',
    price: 42000,
    image: u('1559737558-2f5a35f4523b'),
    alt: 'Grilled prawn skewers finished with charred lime',
    tags: ['gluten-free', 'signature'],
  },
  {
    id: 'sp-plantain',
    category: 'small-plates',
    name: 'Sweet Plantain & Chilli Salt',
    description: 'Caramelised plantain, smoked chilli salt, coriander yoghurt.',
    price: 16000,
    image: u('1601050690117-94f5f6fa8bd7'),
    alt: 'Caramelised plantain slices dusted with chilli salt',
    tags: ['vegetarian', 'gluten-free'],
  },
  {
    id: 'sp-beef-suya',
    category: 'small-plates',
    name: 'Beef Suya Strips',
    description: 'Thin-cut sirloin rolled in groundnut spice, grilled hard and fast.',
    price: 34000,
    image: u('1529193591184-b1d58069ecdd'),
    alt: 'Spiced beef strips arranged on a wooden board',
    tags: ['spicy', 'contains-nuts'],
  },

  // ── MAINS ─────────────────────────────────────────────────────────────────
  {
    id: 'mn-grilled-tilapia',
    category: 'mains',
    name: 'Whole Grilled Tilapia',
    description:
      'Lake-caught tilapia, garlic and lemon, served with kachumbari and cassava chips.',
    price: 58000,
    image: u('1467003909585-2f8a72700288'),
    alt: 'Whole grilled fish plated with fresh tomato salad',
    tags: ['gluten-free', 'signature'],
    featured: true,
  },
  {
    id: 'mn-peanut-chicken',
    category: 'mains',
    name: 'Groundnut Chicken Stew',
    description: 'Slow-braised chicken in groundnut and tomato, steamed rice, greens.',
    price: 46000,
    image: u('1604503468506-a8da13d82791'),
    alt: 'Rich groundnut stew served alongside white rice',
    tags: ['contains-nuts'],
  },
  {
    id: 'mn-village-burger',
    category: 'mains',
    name: 'The Village Burger',
    description:
      'Double beef patty, smoked cheese, caramelised onion, house sauce, hand-cut chips.',
    price: 44000,
    image: u('1551782450-a2132b4ba21d'),
    alt: 'Double stacked burger with melted cheese and chips',
    featured: true,
  },
  {
    id: 'mn-jackfruit-curry',
    category: 'mains',
    name: 'Green Jackfruit Curry',
    description: 'Coconut, turmeric and curry leaf, charred flatbread on the side.',
    price: 38000,
    image: u('1585937421612-70a008356fbe'),
    alt: 'Golden coconut curry finished with fresh coriander',
    tags: ['vegan'],
  },
  {
    id: 'mn-pilau',
    category: 'mains',
    name: 'Village Pilau',
    description: 'Spiced rice cooked in beef stock, slow-braised short rib, pickled onion.',
    price: 48000,
    image: u('1596797038530-2c107229654b'),
    alt: 'Spiced pilau rice topped with braised beef',
  },

  // ── GRILLS ────────────────────────────────────────────────────────────────
  {
    id: 'gr-grilled-chicken',
    category: 'grills',
    name: 'Grilled Chicken',
    description:
      'Char-grilled chicken served with seasonal sides and our signature sauce.',
    price: 35000,
    image: u('1555939594-58d7cb561ad1'),
    alt: 'Char-grilled chicken pieces glistening over coals',
    tags: ['gluten-free'],
    featured: true,
  },
  {
    id: 'gr-sirloin',
    category: 'grills',
    name: 'Fire-Grilled Sirloin',
    description: '300g sirloin over hardwood coals, bone marrow butter, watercress.',
    price: 86000,
    image: u('1600891964092-4316c288032e'),
    alt: 'Sliced sirloin steak resting on a dark board',
    tags: ['gluten-free', 'signature'],
  },
  {
    id: 'gr-goat-ribs',
    category: 'grills',
    name: 'Smoked Goat Ribs',
    description: 'Twelve-hour smoked ribs, honey and chilli lacquer, pickled greens.',
    price: 72000,
    image: u('1544025162-d76694265947'),
    alt: 'Lacquered smoked ribs sliced and stacked',
    tags: ['spicy'],
  },
  {
    id: 'gr-mixed-grill',
    category: 'grills',
    name: 'The Village Mixed Grill',
    description:
      'For two. Chicken, beef suya, goat ribs, prawns, plantain and three sauces.',
    price: 145000,
    image: u('1541014741259-de529411b96a'),
    alt: 'Large mixed grill platter loaded with meats and sides',
    featured: true,
  },
  {
    id: 'gr-grilled-vegetables',
    category: 'grills',
    name: 'Coal-Roasted Vegetables',
    description: 'Sweet potato, aubergine, corn and peppers, smoked tomato dressing.',
    price: 32000,
    image: u('1540420773420-3366772f4999'),
    alt: 'Charred vegetables arranged on a serving platter',
    tags: ['vegan', 'gluten-free'],
  },

  // ── SIDES ─────────────────────────────────────────────────────────────────
  {
    id: 'sd-chips',
    category: 'sides',
    name: 'Hand-Cut Chips',
    description: 'Triple cooked, rosemary salt, garlic aioli.',
    price: 14000,
    image: u('1573080496219-bb080dd4f877'),
    alt: 'Golden hand-cut chips in a metal serving basket',
    tags: ['vegetarian'],
  },
  {
    id: 'sd-kachumbari',
    category: 'sides',
    name: 'Kachumbari',
    description: 'Tomato, red onion, chilli and lime. Cold and sharp.',
    price: 10000,
    image: u('1540420773420-3366772f4999'),
    alt: 'Fresh tomato and onion salad with chilli',
    tags: ['vegan', 'gluten-free'],
  },
  {
    id: 'sd-rice',
    category: 'sides',
    name: 'Coconut Rice',
    description: 'Steamed long grain, coconut milk, toasted curry leaf.',
    price: 12000,
    image: u('1596797038530-2c107229654b'),
    alt: 'Bowl of steamed coconut rice',
    tags: ['vegan', 'gluten-free'],
  },
  {
    id: 'sd-greens',
    category: 'sides',
    name: 'Smoked Greens',
    description: 'Local greens wilted with garlic, chilli and smoked butter.',
    price: 12000,
    image: u('1546069901-ba9599a7e63c'),
    alt: 'Sautéed greens finished with chilli',
    tags: ['vegetarian', 'gluten-free'],
  },

  // ── DESSERTS ──────────────────────────────────────────────────────────────
  {
    id: 'ds-passion-cheesecake',
    category: 'desserts',
    name: 'Passion Fruit Cheesecake',
    description: 'Baked vanilla cheesecake, passion fruit curd, toasted coconut.',
    price: 22000,
    image: u('1551024506-0bccd828d307'),
    alt: 'Slice of cheesecake topped with passion fruit',
    tags: ['vegetarian'],
    featured: true,
  },
  {
    id: 'ds-chocolate',
    category: 'desserts',
    name: 'Dark Chocolate & Chilli Tart',
    description: 'Single-origin chocolate, a whisper of chilli, salted cream.',
    price: 24000,
    image: u('1488477181946-6428a0291777'),
    alt: 'Dark chocolate tart with a quenelle of cream',
    tags: ['vegetarian'],
  },
  {
    id: 'ds-mango',
    category: 'desserts',
    name: 'Grilled Mango & Lime',
    description: 'Caramelised mango, lime sorbet, black pepper honey.',
    price: 19000,
    image: u('1563805042-7684c019e1cb'),
    alt: 'Grilled mango served with a scoop of sorbet',
    tags: ['vegan', 'gluten-free'],
  },

  // ── COCKTAILS ─────────────────────────────────────────────────────────────
  {
    id: 'ck-passion-mojito',
    category: 'cocktails',
    name: 'Passion Fruit Mojito',
    description: 'White rum, fresh passion fruit, mint, lime, soda. The house favourite.',
    price: 25000,
    image: u('1514362545857-3bc16c4c7d1b'),
    alt: 'Tall mojito packed with mint and passion fruit',
    tags: ['signature'],
    featured: true,
  },
  {
    id: 'ck-bamboo-old-fashioned',
    category: 'cocktails',
    name: 'Bamboo Old Fashioned',
    description: 'Bourbon, roasted banana syrup, cacao bitters, orange oils.',
    price: 32000,
    image: u('1470337458703-46ad1756a187'),
    alt: 'Old fashioned served over a single clear ice cube',
    tags: ['signature'],
  },
  {
    id: 'ck-hibiscus-spritz',
    category: 'cocktails',
    name: 'Hibiscus Spritz',
    description: 'Hibiscus, prosecco, aperitivo, grapefruit twist. Long and low.',
    price: 28000,
    image: u('1574096079513-d8259312b785'),
    alt: 'Deep red spritz served over ice with citrus',
  },
  {
    id: 'ck-smoked-negroni',
    category: 'cocktails',
    name: 'Smoked Village Negroni',
    description: 'Gin, sweet vermouth, bitter aperitivo, smoked under glass at the table.',
    price: 34000,
    image: u('1536935338788-846bb9981813'),
    alt: 'Negroni presented under a cloche of smoke',
    featured: true,
  },
  {
    id: 'ck-ginger-margarita',
    category: 'cocktails',
    name: 'Ginger & Chilli Margarita',
    description: 'Tequila, lime, fresh ginger, chilli salt rim.',
    price: 30000,
    image: u('1544145945-f90425340c7e'),
    alt: 'Margarita with a chilli salt rim and lime wheel',
    tags: ['spicy'],
  },

  // ── WINES ─────────────────────────────────────────────────────────────────
  {
    id: 'wn-sauvignon-glass',
    category: 'wines',
    name: 'Sauvignon Blanc — Glass',
    description: 'Western Cape. Cut grass, gooseberry, sharp finish.',
    price: 28000,
    image: u('1510812431401-41d2bd2722f3'),
    alt: 'Glass of chilled white wine catching the light',
  },
  {
    id: 'wn-shiraz-glass',
    category: 'wines',
    name: 'Shiraz — Glass',
    description: 'Stellenbosch. Black pepper, plum, soft tannin.',
    price: 30000,
    image: u('1470158499416-75be9aa0c4db'),
    alt: 'Red wine being poured into a wide glass',
  },
  {
    id: 'wn-rose-bottle',
    category: 'wines',
    name: 'Provence Rosé — Bottle',
    description: 'Pale, dry and mineral. Built for the terrace at sunset.',
    price: 165000,
    image: u('1558346489-19413928158b'),
    alt: 'Bottle of pale rosé resting in an ice bucket',
  },
  {
    id: 'wn-champagne',
    category: 'wines',
    name: 'Champagne — Bottle',
    description: 'Brut NV. For the tables that have something to celebrate.',
    price: 420000,
    // The previous photo 404'd. This one is verified; swap it for a real
    // bottle shot when Bamboo Village's own photography arrives.
    image: u('1533174072545-7a4b6ad7a6c3'),
    alt: 'A celebratory table of drinks shot from above',
    tags: ['signature'],
  },

  // ── SPIRITS ───────────────────────────────────────────────────────────────
  {
    id: 'sp-single-malt',
    category: 'spirits',
    name: 'Single Malt Whisky',
    description: '12 year. Neat, over ice, or with a splash of still water.',
    price: 38000,
    image: u('1569529465841-dfecdab7503b'),
    alt: 'Whisky poured neat into a heavy tumbler',
  },
  {
    id: 'sp-aged-rum',
    category: 'spirits',
    name: 'Aged Caribbean Rum',
    description: 'Eight years in oak. Vanilla, molasses, warm spice.',
    price: 32000,
    image: u('1527281400683-1aae777175f8'),
    alt: 'Bottles of aged rum lined along the back bar',
  },
  {
    id: 'sp-gin',
    category: 'spirits',
    name: 'Craft Gin & Tonic',
    description: 'Your choice of gin, premium tonic, garnished to match.',
    price: 26000,
    image: u('1514933651103-005eec06c04b'),
    alt: 'Gin and tonic in a balloon glass with botanicals',
  },
  {
    id: 'sp-tequila',
    category: 'spirits',
    name: 'Reposado Tequila',
    description: 'Rested six months. Served with orange and chilli salt.',
    price: 34000,
    image: u('1516535794938-6063878f08cc'),
    alt: 'Tequila served alongside orange and chilli salt',
  },

  // ── MOCKTAILS ─────────────────────────────────────────────────────────────
  {
    id: 'mk-virgin-mojito',
    category: 'mocktails',
    name: 'Virgin Village Mojito',
    description: 'Passion fruit, mint, lime and soda. All of the drink, none of the rum.',
    price: 16000,
    image: u('1621263764928-df1444c5e859'),
    alt: 'Alcohol-free mojito packed with mint and ice',
    tags: ['vegan'],
  },
  {
    id: 'mk-hibiscus-cooler',
    category: 'mocktails',
    name: 'Hibiscus Cooler',
    description: 'Steeped hibiscus, ginger, lime and sparkling water.',
    price: 15000,
    image: u('1497534446932-c925b458314e'),
    alt: 'Deep pink hibiscus cooler over crushed ice',
    tags: ['vegan'],
  },
  {
    id: 'mk-coconut-crush',
    category: 'mocktails',
    name: 'Coconut & Pineapple Crush',
    description: 'Blended coconut, pineapple and lime. Cold enough to hurt.',
    price: 18000,
    image: u('1445282768818-728615cc910a'),
    alt: 'Blended coconut and pineapple drink with a straw',
    tags: ['vegan'],
  },

  // ── NON-ALCOHOLIC ─────────────────────────────────────────────────────────
  {
    id: 'nd-fresh-juice',
    category: 'soft-drinks',
    name: 'Fresh Pressed Juice',
    description: 'Passion, mango, pineapple or watermelon. Pressed to order.',
    price: 12000,
    image: u('1613478223719-2ab802602423'),
    alt: 'Freshly pressed juice served in a tall glass',
    tags: ['vegan', 'gluten-free'],
  },
  {
    id: 'nd-soda',
    category: 'soft-drinks',
    name: 'Soft Drinks',
    description: 'Cola, lemon-lime, tonic, ginger ale, soda water.',
    price: 6000,
    image: u('1581636625402-29b2a704ef13'),
    alt: 'Chilled bottles of soft drinks on ice',
  },
  {
    id: 'nd-water',
    category: 'soft-drinks',
    name: 'Still / Sparkling Water',
    description: '750ml bottle, served chilled with lime.',
    price: 8000,
    image: u('1523362628745-0c100150b504'),
    alt: 'Bottle of sparkling water with a glass and lime',
  },
  {
    id: 'nd-coffee',
    category: 'soft-drinks',
    name: 'Ugandan Coffee',
    description: 'Single origin, locally roasted. Espresso, americano or latte.',
    price: 10000,
    image: u('1509042239860-f550ce710b93'),
    alt: 'Espresso served in a small ceramic cup',
    tags: ['vegetarian'],
  },
];

// ---------------------------------------------------------------------------
// Derived helpers — nothing below here needs editing when the menu changes.
// ---------------------------------------------------------------------------

export const getItemsByCategory = (category: MenuCategoryId): MenuItem[] =>
  menuItems.filter((item) => item.category === category);

export const getMenuItem = (id: string): MenuItem | undefined =>
  menuItems.find((item) => item.id === id);

export const featuredItems: MenuItem[] = menuItems.filter((item) => item.featured);

export const kitchenCategories = menuCategories.filter((c) => c.group === 'kitchen');
export const barCategories = menuCategories.filter((c) => c.group === 'bar');
