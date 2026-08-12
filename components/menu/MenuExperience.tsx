'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItemCard } from './MenuItemCard';
import { Reveal } from '@/components/ui/Reveal';
import { useCart } from '@/components/cart/CartProvider';
import {
  menuCategories,
  menuItems,
  featuredItems,
  dietaryTagLabels,
  type MenuCategoryId,
} from '@/data/menu';
import { formatPrice } from '@/lib/format';
import { useBodyFlag } from '@/hooks/useBodyFlag';
import { cn } from '@/lib/utils';

/**
 * The interactive digital menu.
 *
 * A sticky category bar tracks the guest's position as they scroll, each
 * category animates in, and every dish can be added to the order without ever
 * leaving the page.
 */
export function MenuExperience() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>(
    menuCategories[0].id,
  );
  const sectionRefs = useRef(new Map<MenuCategoryId, HTMLElement>());
  const { count, openCart, subtotal } = useCart();

  // Lifts the floating WhatsApp button above the sticky mobile order bar.
  useBodyFlag('data-orderbar', count > 0);

  // Scroll spy — highlights whichever category is currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) {
          setActiveCategory(visible.target.id as MenuCategoryId);
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    sectionRefs.current.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (id: MenuCategoryId) => {
    const element = sectionRefs.current.get(id);
    if (!element) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Village favourites */}
      <section className="section-tight bg-charcoal" aria-labelledby="favourites-heading">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow flex items-center gap-4">
                  <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                  Start here
                </span>
                <h2
                  id="favourites-heading"
                  className="display-md mt-5 font-display text-cream"
                >
                  Village favourites
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-cream/50">
                The plates and pours we are asked for by name.
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="rail mt-10 gap-5 px-(--spacing-gutter) pb-4">
          {featuredItems.map((item, index) => (
            <MenuItemCard key={item.id} item={item} variant="feature" index={index} />
          ))}
        </ul>
      </section>

      {/* Sticky category navigation */}
      <div className="sticky top-17 z-30 border-y border-gold/15 bg-ink/92 backdrop-blur-lg">
        <nav aria-label="Menu categories" className="shell-wide">
          <ul className="rail gap-1 py-3">
            {menuCategories.map((category) => {
              const active = category.id === activeCategory;
              return (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => scrollToCategory(category.id)}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'relative block px-4 py-2.5 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] whitespace-nowrap uppercase transition-colors duration-300',
                      active ? 'text-ink' : 'text-cream/60 hover:text-cream',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="menu-category-pill"
                        className="absolute inset-0 bg-gold"
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span className="relative">{category.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Categories */}
      <div className="bg-ink">
        <div className="shell section">
          {menuCategories.map((category, categoryIndex) => {
            const items = menuItems.filter((item) => item.category === category.id);
            if (items.length === 0) return null;

            return (
              <section
                key={category.id}
                id={category.id}
                ref={(element) => {
                  if (element) sectionRefs.current.set(category.id, element);
                  else sectionRefs.current.delete(category.id);
                }}
                aria-labelledby={`${category.id}-heading`}
                className={cn(
                  'scroll-mt-44',
                  categoryIndex > 0 && 'mt-20 border-t border-gold/10 pt-20',
                )}
              >
                <Reveal>
                  <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                    <h2
                      id={`${category.id}-heading`}
                      className="display-md font-display text-cream"
                    >
                      {category.name}
                    </h2>
                    <p className="font-sans text-sm text-cream/45 italic">
                      {category.blurb}
                    </p>
                    <span className="font-sans text-[0.625rem] tracking-[0.24em] text-gold/60 tabular-nums uppercase">
                      {String(items.length).padStart(2, '0')} items
                    </span>
                  </div>
                </Reveal>

                <ul className="grid gap-7 lg:grid-cols-2 lg:gap-x-14">
                  {items.map((item, index) => (
                    <MenuItemCard key={item.id} item={item} index={index} />
                  ))}
                </ul>
              </section>
            );
          })}

          {/* Dietary key + placeholder notice */}
          <div className="mt-20 border-t border-gold/15 pt-10">
            <h2 className="eyebrow mb-6">Dietary key</h2>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {Object.entries(dietaryTagLabels).map(([key, label]) => (
                <li key={key} className="flex items-center gap-2.5">
                  <span className="flex h-5 min-w-5 items-center justify-center border border-gold/25 px-1.5 font-sans text-[0.5625rem] font-bold text-champagne/70">
                    {label.short}
                  </span>
                  <span className="text-sm text-cream/55">{label.full}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-cream/40">
              Sample menu shown for layout purposes. Dish names, descriptions, prices
              and photography are placeholders and will be replaced with Bamboo
              Village&rsquo;s live menu. Please tell your server about any allergies
              before ordering.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile order bar — always one tap from checkout */}
      {count > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-ink/95 px-4 py-3 backdrop-blur-lg sm:hidden"
        >
          <button
            type="button"
            onClick={openCart}
            className="flex w-full items-center justify-between gap-4 bg-gold px-5 py-4"
          >
            <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-ink uppercase">
              View order · {count}
            </span>
            <span className="font-sans text-sm font-bold text-ink tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </button>
        </motion.div>
      )}
    </>
  );
}
