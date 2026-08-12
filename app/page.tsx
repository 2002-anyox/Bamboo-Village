import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { BrandIntro } from '@/components/home/BrandIntro';
import { FoodSection } from '@/components/home/FoodSection';
import { DrinksSection } from '@/components/home/DrinksSection';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { HorizontalGallery } from '@/components/home/HorizontalGallery';
import { EventsPreview } from '@/components/home/EventsPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { SocialGrid } from '@/components/home/SocialGrid';
import { ReservationCTA } from '@/components/home/ReservationCTA';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <FoodSection />
      <DrinksSection />
      <ExperienceSection />
      <HorizontalGallery />
      <EventsPreview />
      <Testimonials />
      <SocialGrid />
      <ReservationCTA />
    </>
  );
}
