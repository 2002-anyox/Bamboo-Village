# BAMBOO VILLAGE

Restaurant, bar and dining experience — a production-ready marketing and
ordering site.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**,
**Framer Motion** and **Lenis**.

---

## Contents

1. [Quick start](#quick-start)
2. [What's in the box](#whats-in-the-box)
3. [Project structure](#project-structure)
4. [**Replacing the content**](#replacing-the-content) ← start here
   - [WhatsApp number](#1-whatsapp-number)
   - [Address, phone, email, hours, socials](#2-address-phone-email-hours-socials)
   - [Photography](#3-photography)
   - [Video](#4-video)
   - [Menu items and prices](#5-menu-items-and-prices)
   - [Gallery](#6-gallery)
   - [Events](#7-events)
   - [Testimonials and statistics](#8-testimonials-and-statistics)
   - [Google Map](#9-google-map)
   - [Colours and fonts](#10-colours-and-fonts)
5. [How ordering works](#how-ordering-works)
6. [Connecting the forms](#connecting-the-forms)
7. [Accessibility](#accessibility)
8. [Performance](#performance)
9. [SEO](#seo)
10. [Deploying](#deploying)
11. [Pre-launch checklist](#pre-launch-checklist)

---

## Quick start

Requires **Node 18.18 or newer** (`node --version` to check).

**macOS / Linux**

```bash
npm install
cp .env.example .env.local     # optional — enables one-tap WhatsApp sending
npm run dev                    # http://localhost:3000
```

**Windows (PowerShell)**

```powershell
npm.cmd install
Copy-Item .env.example .env.local   # optional
npm.cmd run dev                     # http://localhost:3000
```

> **Why `npm.cmd`?** PowerShell blocks npm's `npm.ps1` shim by default with
> *"running scripts is disabled on this system"*. `npm.cmd` is a batch file, so
> the execution policy does not apply and it just works. To use plain `npm`
> instead, run this once — user-scoped, no admin rights needed:
>
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
> ```
>
> Command Prompt (`cmd.exe`) is unaffected either way.

The `.env.local` step is optional. Without it the site runs normally and
WhatsApp actions fall back to copy-to-clipboard — see
[WhatsApp number](#1-whatsapp-number).

Other scripts:

```bash
npm run build          # production build
npm run start          # serve the production build
npm run typecheck      # TypeScript, no emit
npm run check:images   # verifies every photo referenced in data/ actually loads
```

---

## What's in the box

**Eight pages**, all fully built:

| Route           | What it is                                                         |
| --------------- | ------------------------------------------------------------------ |
| `/`             | Long-form homepage — 11 sections, hero → footer                     |
| `/menu`         | Interactive digital menu, 11 categories, add-to-order on every item |
| `/order`        | Full ordering interface with search, filters and live order summary |
| `/about`        | Editorial storytelling — Our Story, Food, Bar, People, Vibe         |
| `/gallery`      | Filterable masonry gallery with a fullscreen lightbox               |
| `/events`       | Programme, private hire, and an enquiry form                        |
| `/reservations` | Booking request form with a WhatsApp alternative                    |
| `/contact`      | Details, hours, map, socials and a message form                     |

Plus a designed 404, `sitemap.xml`, `robots.txt`, a generated Open Graph image
and a favicon.

**Working functionality** — not mockups:

- Cart with quantities, removal, live totals, and persistence across pages and refreshes
- Slide-out cart available from every page, plus a full checkout page
- WhatsApp order generation in the exact format the venue asked for
- Reservation form with validation and a pluggable delivery layer
- Event and contact enquiry forms
- Gallery filtering and a keyboard/swipe-navigable lightbox
- Menu category scroll-spy, search and filtering

---

## Project structure

```
app/                      Routes. One folder per page.
  layout.tsx              Fonts, metadata, structured data, global chrome
  template.tsx            Page-transition curtain
  globals.css             Design tokens + component utilities
  opengraph-image.tsx     Generated social card
components/
  layout/                 Navbar, MobileNav, Footer, PageHeader, Wordmark
  home/                   The eleven homepage sections
  menu/                   Menu experience + dish cards
  order/                  Full ordering interface
  cart/                   Cart state, drawer, line items, checkout hook
  gallery/                Masonry gallery + lightbox
  events/                 Event card
  about/                  Story section
  contact/                Map panel, WhatsApp button
  forms/                  Field primitives, reservation + enquiry forms
  providers/              WhatsApp dispatcher
  ui/                     Button, SmartImage, ImageReveal, MediaCard,
                          SectionHeading, Reveal, VideoBackground
  shared/                 Cursor, Grain, ScrollProgress, SmoothScroll,
                          FloatingActions
data/                     ← ALL EDITABLE CONTENT LIVES HERE
  restaurant.ts           Contact details, hours, socials, navigation
  images.ts               Every photograph on the site
  menu.ts                 Menu categories and items
  gallery.ts              Gallery photographs and categories
  events.ts               Event programme and private hire
  testimonials.ts         Reviews and headline statistics
lib/
  whatsapp.ts             Message templates + deep links
  reservations.ts         Reservation delivery (WhatsApp / email / API)
  format.ts               Currency and date formatting
hooks/                    useMediaQuery, useBodyFlag
scripts/check-images.mjs  Image health check
public/images/            Drop your photography here
public/video/             Drop your hero video here
```

The rule: **content lives in `data/`, presentation lives in `components/`.**
You should almost never need to open a component to change what the site says.

---

## Replacing the content

### 1. WhatsApp number

The number appears in exactly one place. Set it in `.env.local`:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=2567XXXXXXXX
```

**Full international format, digits only** — no `+`, no spaces, no dashes.
Uganda numbers start `256`. A number written `+256 700 123 456` becomes
`256700123456`.

Alternatively edit `whatsappNumber` in `data/restaurant.ts`. The environment
variable always wins.

**Until you set it**, every WhatsApp action still builds the complete message
and shows it with a one-tap *Copy message* button, so nothing appears broken
while the site is in development. Once the number is set, the same buttons open
WhatsApp directly with the message pre-filled.

Every WhatsApp button on the site — the floating button, the navbar link, the
footer, the cart, the reservation form, the event cards, the contact page —
routes through `lib/whatsapp.ts` and reads that one value.

### 2. Address, phone, email, hours, socials

All in `data/restaurant.ts`. Placeholders are written in `[SQUARE BRACKETS]` so
anything you forget is obvious on the page:

```ts
phone: '[PHONE NUMBER]',              → '+256 700 123 456'
email: '[EMAIL ADDRESS]',             → 'hello@bamboovillage.ug'
address: {
  line1: 'Enyau Road',
  line2: '[PLOT / BUILDING]',         → 'Plot 14'
  city: 'Arua',
  mapsQuery: 'Bamboo Village Enyau Road Arua Uganda',  ← "Get directions"
  lat: 3.0201, lng: 30.9111,          ← Arua town centre, not the venue —
                                        replace with the exact coordinates
},
hours: [ { days: 'Friday', hours: '[11:00 — 02:00]', note: 'Live DJ from 21:00' } ],
socials: [ { label: 'Instagram', handle: '@…', href: '[INSTAGRAM URL]' } ],
```

Also update `siteUrl` (or `NEXT_PUBLIC_SITE_URL`) — it drives canonical URLs,
the sitemap and social previews.

Changing `hours` also means updating `openingHoursSpecification` in
`app/layout.tsx`, which is the machine-readable copy Google reads.

### 3. Photography

**Every image on the site is referenced from `data/images.ts`** (plus per-item
photos in `data/menu.ts`, `data/gallery.ts` and `data/events.ts`). You never
edit a component to change a picture.

Two ways to supply one:

```ts
// A — local file (recommended for production)
{ src: '/images/hero-terrace.jpg', alt: 'The terrace at dusk' }

// B — any https URL
{ src: 'https://…', alt: '…' }
```

For local files, drop them in `public/images/` and reference them as
`/images/filename.jpg`.

Each entry takes:

| Field     | Purpose                                                                |
| --------- | ---------------------------------------------------------------------- |
| `src`     | Local path or URL                                                      |
| `alt`     | **Required.** Read by screen readers, and used as the lightbox caption |
| `focal`   | Optional `object-position`, e.g. `'50% 30%'` when the subject is high  |
| `caption` | Optional extra caption                                                 |

**The current photography is placeholder stock** (Unsplash) and must be
replaced before launch. After swapping images in, run:

```bash
npm run check:images
```

which fetches every referenced image and lists anything that fails. If an image
ever cannot be loaded, the site renders a branded placeholder panel rather than
a broken-image icon — so a missing photo degrades quietly instead of embarrassingly.

Recommended exports: hero/full-bleed **2400px wide**, cards **1200px**,
thumbnails **600px**, all JPEG or WebP at ~75% quality.

### 4. Video

The hero supports a cinematic background video. It is **off by default**.

1. Put an `.mp4` in `public/video/`
2. In `data/images.ts`:

```ts
export const heroVideo = {
  src: '/video/hero.mp4',        // '' disables video entirely
  poster: heroImages.poster.src,
  alt: 'Ambient footage of the bar at night',
};
```

Encode at 1920×1080, H.264, **no audio track**, a 6–12 second loop, under 4 MB.

The video autoplays muted, loops, plays inline on iOS, only begins downloading
when the hero is near the viewport, pauses when scrolled away, and falls back to
the poster image if autoplay is refused, the file fails, or the guest prefers
reduced motion.

`components/ui/VideoBackground.tsx` is reusable — drop it into any section that
needs a moving backdrop.

### 5. Menu items and prices

`data/menu.ts`. Everything currently there is **sample content**.

```ts
{
  id: 'gr-grilled-chicken',        // unique + stable (it's the cart key)
  category: 'grills',
  name: 'Grilled Chicken',
  description: 'Char-grilled chicken served with seasonal sides…',
  price: 35000,                    // plain number → renders "UGX 35,000"
  image: u('1555939594-58d7cb561ad1'),   // or '/images/dishes/chicken.jpg'
  alt: 'Char-grilled chicken pieces over coals',
  tags: ['gluten-free'],
  featured: true,                  // shows in the "Village favourites" rail
}
```

- **Prices** are whole numbers in UGX. Change the currency in
  `restaurantConfig.currency`.
- **Categories** live in `menuCategories` — reorder the array to reorder the
  menu, delete an entry to hide a category.
- **Dietary tags**: `vegetarian`, `vegan`, `gluten-free`, `contains-nuts`,
  `spicy`, `signature`.
- **Do not reuse an `id`** — changing one drops that item from any cart a guest
  has already saved.

### 6. Gallery

`data/gallery.ts`. `span` controls each photo's footprint in the masonry
(`tall`, `portrait`, `square`, `wide`) — vary it to keep the grid lively.
`category` drives the filter buttons. `featuredGallery` at the bottom picks the
twelve frames used by the homepage rail, in order.

### 7. Events

`data/events.ts`. `day` is the recurring label ("Friday"); set `date` instead
for a one-off ("14 MAR"). `enquiryTopic` pre-fills the WhatsApp message when a
guest taps that card's button. `featured: true` puts an event on the homepage.
`privateHireOptions` feeds the "Host your event" section.

### 8. Testimonials and statistics

`data/testimonials.ts`. **The reviews are written placeholders — replace them
with real, attributed guest feedback before launch.** `villageStats` drives the
large numbers on the homepage and About page.

### 9. Google Map

`components/contact/MapPanel.tsx` ships a designed placeholder that links out to
Google Maps and works today. To embed the real map, replace the block marked
`PLACEHOLDER SURFACE` with:

```tsx
<iframe
  title="Bamboo Village on Google Maps"
  src="https://www.google.com/maps/embed?pb=…"  // Maps → Share → Embed a map
  className="absolute inset-0 h-full w-full border-0"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  allowFullScreen
/>
```

Then set the real `lat`/`lng` in `data/restaurant.ts`.

### 10. Colours and fonts

All design tokens are at the top of `app/globals.css`:

```css
@theme {
  --color-forest: #0b2b20;
  --color-bamboo: #1f5a3d;
  --color-jade: #087f5b;
  --color-gold: #d6a84f;
  --color-champagne: #e8d3a3;
  --color-ember: #c96835;
  --color-charcoal: #101412;
  --color-cream: #f5ebdd;
}
```

Change one value and it updates everywhere — Tailwind generates `bg-gold`,
`text-jade`, `border-champagne` and so on from these.

Fonts are loaded in `app/layout.tsx` via `next/font` (Playfair Display for
display type, Manrope for UI). Swap the imports to change them.

---

## How ordering works

There is no payment processing and no backend — deliberately. Orders are
confirmed the way this kind of venue actually works: over WhatsApp.

1. Guest adds items from `/menu` or `/order`. The button confirms inline, the
   cart badge pulses, the count updates.
2. The cart persists in `localStorage`, so it survives navigation, refreshes and
   accidental tab closes.
3. Guest enters name, phone, delivery/pickup, address and any instructions.
4. **Order via WhatsApp** builds the message and opens WhatsApp:

```
Hello Bamboo Village 👋

I'd like to place an order:

2 × Grilled Chicken — UGX 70,000
1 × Passion Fruit Mojito — UGX 25,000

Subtotal: UGX 95,000
Total: UGX 95,000

Name:
John Doe

Phone:
+256 700 123 456

Delivery/Pickup:
Delivery

Address:
Plot 14, Enyau Road, Arua

Special instructions:
Please make the chicken spicy.

Thank you!
```

To add a delivery fee, set `deliveryFee` in `data/restaurant.ts` — it appears as
its own line in the cart and in the message.

To change the wording, edit `buildOrderMessage` in `lib/whatsapp.ts`.

---

## Connecting the forms

**Reservations** — `lib/reservations.ts` has a `mode` switch:

```ts
export const reservationConfig = {
  mode: 'whatsapp',   // 'whatsapp' | 'email' | 'api'
  endpoint: '/api/reservations',
};
```

- `whatsapp` *(default)* — opens WhatsApp with the booking pre-filled
- `email` — opens the guest's mail client to `reservationsEmail`
- `api` — POSTs JSON to `endpoint`; point it at a Next.js route handler, your
  backend, or a booking platform's webhook (OpenTable, SevenRooms, Resy, Eat
  App). Expects `{ ok: true }`. If the request fails it falls back to WhatsApp
  so a guest is never stranded.

The payload shape is `ReservationPayload` — a platform integration only has to
map those fields.

**Enquiry and contact forms** — `components/forms/EnquiryForm.tsx`. The
`handleSubmit` function has a marked `TODO` where you can also POST the payload
to a CRM or route handler alongside the WhatsApp hand-off.

**Newsletter** — `NewsletterForm` in `components/layout/Footer.tsx`. Validation
and UI states are done; POST the email to Mailchimp/Klaviyo/Brevo at the marked
`TODO`.

---

## Accessibility

- Semantic landmarks throughout, one `<h1>` per page, ordered headings
- Skip-to-content link as the first focusable element
- Visible gold focus ring on every interactive element, never removed
- Cart drawer, mobile menu and lightbox all trap focus, close on `Escape`, and
  restore focus to whatever opened them
- Lightbox navigates with `←`/`→`; every control has an accessible name
- Forms use real `<label>` elements, `aria-invalid` and `role="alert"` errors
- All photography carries meaningful alt text; decorative layers are
  `aria-hidden`
- **`prefers-reduced-motion` is respected everywhere** — scroll animations,
  parallax, the grain, the marquee, smooth scrolling, the custom cursor,
  testimonial auto-advance and page transitions all switch off, and the
  pinned horizontal gallery becomes an ordinary swipe rail
- Touch targets are at least 44px; the custom cursor never appears on touch

## Performance

- All eight pages prerender as static HTML (~103 kB shared JS)
- Photography is lazy-loaded with responsive `srcset`, `object-fit: cover`, and
  `fetchpriority="high"` reserved for the hero
- Video is intersection-loaded and pauses off-screen
- Animations are transform/opacity only, so they stay on the compositor
- Smooth scrolling is skipped entirely on touch devices

## SEO

- Per-page titles, descriptions and canonical URLs
- Open Graph and Twitter card metadata, with a generated social image
- **Restaurant + LocalBusiness schema** in `app/layout.tsx`
- **Menu schema** on `/menu`, **Event schema** on `/events`
- `sitemap.xml` and `robots.txt` generated from the navigation config

Set `NEXT_PUBLIC_SITE_URL` before deploying so canonical URLs are correct.

## Deploying

Deploys anywhere Next.js runs. On Vercel: import the repository, set
`NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_SITE_URL` in project settings,
deploy.

```bash
npm run build && npm run start   # anywhere else, behind a reverse proxy
```

---

## Pre-launch checklist

- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` set and tested on a real phone
- [ ] `NEXT_PUBLIC_SITE_URL` set to the live domain
- [ ] Every `[SQUARE BRACKET]` placeholder in `data/restaurant.ts` replaced
- [ ] Exact venue coordinates set (`address.lat` / `address.lng` currently point
      at Arua town centre, not the building)
- [ ] Real opening hours set, and mirrored into the schema in `app/layout.tsx`
- [ ] Social links point at real profiles
- [ ] Real menu, prices and dish photography in `data/menu.ts`
- [ ] Real photography throughout `data/images.ts` and `data/gallery.ts`
- [ ] `npm run check:images` passes
- [ ] Real event programme in `data/events.ts`
- [ ] Placeholder testimonials replaced with genuine, attributed reviews
- [ ] Google Map embed swapped in, with real coordinates
- [ ] Newsletter form wired to a mailing-list provider
- [ ] Decide how reservations should arrive (`lib/reservations.ts`)
- [ ] Test an order end to end on a real phone
