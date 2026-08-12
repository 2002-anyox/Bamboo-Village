'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { MediaCard } from '@/components/ui/MediaCard';
import { Button } from '@/components/ui/Button';
import { foodImages } from '@/data/images';

/** The four ways into the kitchen. Each card deep-links to the menu. */
const FOOD_CARDS = [
  {
    eyebrow: 'The one to order',
    title: 'Signature Dish',
    description:
      'Whole grilled tilapia, lake-caught, garlic and lemon, kachumbari alongside.',
    href: '/menu#mains',
  },
  {
    eyebrow: 'Live fire',
    title: 'Grilled Specials',
    description: 'Hardwood coals, twelve-hour smoke, and a grill that never goes cold.',
    href: '/menu#grills',
  },
  {
    eyebrow: 'For the table',
    title: 'Shared Plates',
    description: 'Built for the middle of the table. Order more than you think you need.',
    href: '/menu#small-plates',
  },
  {
    eyebrow: 'Stay a little longer',
    title: 'Desserts',
    description: 'Passion fruit, dark chocolate and chilli, grilled mango and lime.',
    href: '/menu#desserts',
  },
];

export function FoodSection() {
  return (
    <section className="section relative bg-charcoal" aria-labelledby="food-heading">
      <div className="shell">
        <SectionHeading
          eyebrow="From the kitchen"
          title={'Come\nhungry.'}
          description="Fire, smoke and patience. Everything is cooked to order, so give us a moment — it is worth it."
          action={
            <Button href="/menu" variant="outline" withArrow magnetic>
              View menu
            </Button>
          }
          titleClassName="font-display"
        />

        <h2 id="food-heading" className="sr-only">
          Food at Bamboo Village
        </h2>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {FOOD_CARDS.map((card, index) => {
            const image = foodImages[index % foodImages.length];
            return (
              <MediaCard
                key={card.title}
                href={card.href}
                image={image.src}
                alt={image.alt}
                focal={image.focal}
                eyebrow={card.eyebrow}
                title={card.title}
                description={card.description}
                index={index}
                // The middle two cards sit slightly lower — an editorial rhythm.
                className={index % 2 === 1 ? 'lg:mt-12' : undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
