import type { MetadataRoute } from 'next';
import { restaurantConfig, navigation, secondaryNavigation } from '@/data/restaurant';

/** Emitted as a file at build time — required for the static Pages export. */
export const dynamic = 'force-static';

/** Generated from the same navigation config that drives the site's menus. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    ...navigation.map((item) => item.href),
    ...secondaryNavigation.map((item) => item.href),
  ];

  return routes.map((route) => ({
    url: `${restaurantConfig.siteUrl}${route === '/' ? '' : route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/menu' || route === '/order' ? 0.9 : 0.7,
  }));
}
