import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { GalleryExperience } from '@/components/gallery/GalleryExperience';
import { Button } from '@/components/ui/Button';
import { experienceImages } from '@/data/images';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Inside Bamboo Village — the food, the bar, the terrace and the nights that run late. A photographic tour of the village.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery | Bamboo Village',
    description: 'The food, the bar, the terrace and the nights that run late.',
    url: '/gallery',
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="The village,"
        accent="frame by frame."
        description="Fire, glassware, faces and light. Tap any photograph to open it full screen."
        image={experienceImages[3].src}
        imageAlt={experienceImages[3].alt}
      >
        <Button href="/reservations" variant="outline" withArrow magnetic>
          See it in person
        </Button>
      </PageHeader>

      <GalleryExperience />
    </>
  );
}
