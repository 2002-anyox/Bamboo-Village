import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import './globals.css';

import { CartProvider } from '@/components/cart/CartProvider';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { WhatsAppProvider } from '@/components/providers/WhatsAppProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Grain } from '@/components/shared/Grain';
import { Cursor } from '@/components/shared/Cursor';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { FloatingActions } from '@/components/shared/FloatingActions';
import { restaurantConfig, formattedAddress } from '@/data/restaurant';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const TITLE = 'Bamboo Village | Restaurant, Bar & Dining Experience';

export const metadata: Metadata = {
  metadataBase: new URL(restaurantConfig.siteUrl),
  title: {
    default: TITLE,
    template: '%s | Bamboo Village',
  },
  description: restaurantConfig.description,
  applicationName: restaurantConfig.name,
  keywords: [
    'Bamboo Village',
    'restaurant',
    'cocktail bar',
    'Arua restaurant',
    'restaurant in Arua',
    'live music',
    'private events',
    'grill',
    'nightlife',
  ],
  authors: [{ name: restaurantConfig.name }],
  creator: restaurantConfig.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: restaurantConfig.name,
    title: TITLE,
    description: restaurantConfig.description,
    url: restaurantConfig.siteUrl,
    locale: 'en_UG',
    images: [
      {
        // Replace with a 1200×630 export of the venue's own photography.
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Bamboo Village — restaurant, bar and dining experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: restaurantConfig.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'restaurant',
};

export const viewport: Viewport = {
  themeColor: '#070a09',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/**
 * Restaurant + LocalBusiness structured data.
 * Google reads this for rich results — keep it in sync with restaurantConfig.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${restaurantConfig.siteUrl}/#restaurant`,
  name: restaurantConfig.name,
  description: restaurantConfig.description,
  url: restaurantConfig.siteUrl,
  telephone: restaurantConfig.phone,
  email: restaurantConfig.email,
  servesCuisine: ['African', 'Grill', 'Contemporary', 'Cocktails'],
  priceRange: 'UGX 6,000 — UGX 145,000',
  currenciesAccepted: restaurantConfig.currency.code,
  acceptsReservations: `${restaurantConfig.siteUrl}/reservations`,
  hasMenu: `${restaurantConfig.siteUrl}/menu`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: restaurantConfig.address.line1,
    addressLocality: restaurantConfig.address.city,
    addressCountry: restaurantConfig.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: restaurantConfig.address.lat,
    longitude: restaurantConfig.address.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '11:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '11:00',
      closes: '02:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '11:00',
      closes: '03:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '11:00',
      closes: '22:00',
    },
  ],
  sameAs: restaurantConfig.socials.map((social) => social.href),
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Live music', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Outdoor terrace', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Private events', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Full bar', value: true },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          // Structured data is static and author-controlled.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="format-detection" content="telephone=no" />
        <meta itemProp="address" content={formattedAddress()} />
      </head>
      <body className="min-h-screen antialiased">
        <MotionProvider>
          <WhatsAppProvider>
            <CartProvider>
              <SmoothScroll />
              <ScrollProgress />
              <Grain />
              <Cursor />

              <Navbar />

              <main id="main">{children}</main>

              <Footer />

              <CartDrawer />
              <FloatingActions />
            </CartProvider>
          </WhatsAppProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
