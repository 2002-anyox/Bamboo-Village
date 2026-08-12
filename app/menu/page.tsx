import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { MenuExperience } from '@/components/menu/MenuExperience';
import { Button } from '@/components/ui/Button';
import { foodImages } from '@/data/images';
import { menuItems } from '@/data/menu';
import { restaurantConfig } from '@/data/restaurant';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Explore the Bamboo Village menu — live-fire grills, shared plates, signature cocktails, wine and mocktails. Add to your order and send it straight to WhatsApp.',
  alternates: { canonical: '/menu' },
  openGraph: {
    title: 'Menu | Bamboo Village',
    description:
      'Live-fire grills, shared plates, signature cocktails and more. Order in a few taps.',
    url: '/menu',
  },
};

/** Menu structured data — helps the menu surface directly in search results. */
const menuSchema = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: `${restaurantConfig.name} Menu`,
  url: `${restaurantConfig.siteUrl}/menu`,
  inLanguage: 'en',
  hasMenuSection: Object.values(
    menuItems.reduce<Record<string, { name: string; items: typeof menuItems }>>(
      (sections, item) => {
        const key = item.category;
        sections[key] ??= { name: key, items: [] };
        sections[key].items.push(item);
        return sections;
      },
      {},
    ),
  ).map((section) => ({
    '@type': 'MenuSection',
    name: section.name,
    hasMenuItem: section.items.map((item) => ({
      '@type': 'MenuItem',
      name: item.name,
      description: item.description,
      offers: {
        '@type': 'Offer',
        price: item.price,
        priceCurrency: restaurantConfig.currency.code,
      },
    })),
  })),
};

export default function MenuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />

      <PageHeader
        eyebrow="Kitchen & bar"
        title="The menu."
        accent="Everything, in order."
        description="Cooked over hardwood, poured with intent. Tap anything to add it to your order — you can send the whole thing to us on WhatsApp when you're ready."
        image={foodImages[0].src}
        imageAlt={foodImages[0].alt}
        focal={foodImages[0].focal}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button href="/order" size="md" withArrow magnetic>
            Order online
          </Button>
          <Button href="/reservations" variant="outline" size="md" magnetic>
            Reserve a table
          </Button>
        </div>
      </PageHeader>

      <MenuExperience />
    </>
  );
}
