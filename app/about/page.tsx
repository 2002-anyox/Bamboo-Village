import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { StorySection, type Story } from '@/components/about/StorySection';
import { ReservationCTA } from '@/components/home/ReservationCTA';
import { Reveal } from '@/components/ui/Reveal';
import {
  introImages,
  foodImages,
  foodDetailImages,
  barImages,
  drinkImages,
  peopleImages,
  experienceImages,
  venueImages,
} from '@/data/images';
import { villageStats } from '@/data/testimonials';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story of Bamboo Village — a kitchen built around live fire, a bar that takes every pour seriously, and a room that changes character as the night goes on.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Bamboo Village',
    description:
      'A kitchen built around live fire, a serious bar, and a room that changes as the night goes on.',
    url: '/about',
  },
};

const STORIES: Story[] = [
  {
    eyebrow: 'Our story',
    title: 'It started with',
    accent: 'one long table.',
    paragraphs: [
      'Bamboo Village opened with a single idea and not much else: build the kind of place the founders kept looking for and never quite finding. Somewhere the food was worth a detour, the drinks were made properly, and nobody hurried you toward the door.',
      'The first room held one long table. People who arrived as strangers left as a group. That table is still here, and it still does the same thing — it is simply surrounded by a great deal more now.',
    ],
    image: introImages.primary,
    secondary: introImages.secondary,
    quote:
      '“We wanted a room that behaved differently depending on why you came. That has never changed.”',
  },
  {
    eyebrow: 'The food',
    title: 'Fire, smoke,',
    accent: 'and patience.',
    paragraphs: [
      'Everything worth cooking slowly is cooked slowly. The grill runs on hardwood coals from the moment we open, and the ribs go on twelve hours before anyone thinks about ordering them.',
      'The menu leans on what grows and swims nearby — lake tilapia, groundnuts, plantain, the greens from the hills — handled with technique rather than ceremony. Nothing on the plate is there to be photographed. It just happens to photograph well.',
    ],
    image: foodImages[1],
    secondary: foodDetailImages[0],
  },
  {
    eyebrow: 'The bar',
    title: 'A serious bar,',
    accent: 'lightly worn.',
    paragraphs: [
      'Our bar team measures, tastes and adjusts, then does it again before anything leaves the pass. The signature list rotates with what is ripe, and the classics are made the way they are supposed to be made.',
      'A mocktail gets the same attention as a twenty-year single malt — same glassware, same garnish, same care. Nobody at this bar is treated like they are missing out.',
    ],
    image: barImages.detail,
    secondary: drinkImages[0],
    quote: '“If it is on the list, someone here is proud of it.”',
  },
  {
    eyebrow: 'The people',
    title: 'The reason',
    accent: 'it works.',
    paragraphs: [
      'A kitchen brigade that has cooked together long enough to stop needing to speak. A floor team that reads a table in about four seconds. A bar that can be three deep and still remember your name.',
      'Hospitality here is not a script. It is a group of people who genuinely like the part where you enjoy yourself.',
    ],
    image: peopleImages[0],
    secondary: peopleImages[1],
  },
  {
    eyebrow: 'The vibe',
    title: 'Three rooms,',
    accent: 'one long night.',
    paragraphs: [
      'Lunch is bright and unhurried. Dinner tightens up, the lights drop, and the terrace fills. By eleven on a Friday the room has changed character completely and the floor has taken over.',
      'You can come for any one of those and ignore the rest. Most people mean to — and then stay for all three.',
    ],
    image: experienceImages[3],
    secondary: venueImages[1],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Not just a restaurant."
        accent="A village."
        description="Three spaces, one address, and a fairly simple ambition: be the place people think of first, for almost any reason."
        image={venueImages[0].src}
        imageAlt={venueImages[0].alt}
      />

      {/* Statement */}
      <section className="section-tight border-b border-gold/12 bg-charcoal">
        <div className="shell">
          <Reveal>
            <p className="mx-auto max-w-4xl text-center font-display text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.35] text-cream">
              Where good food, great drinks, music, people and{' '}
              <span className="text-gold italic">unforgettable nights</span> come
              together.
            </p>
          </Reveal>

          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {villageStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.08}>
                <div className="text-center">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-[clamp(2.75rem,5.5vw,4.5rem)] leading-none text-gold">
                      {stat.value}
                      <span className="text-champagne/60">{stat.suffix}</span>
                    </span>
                    <span className="mx-auto mt-4 block max-w-[16ch] font-sans text-[0.6875rem] tracking-[0.24em] text-cream/45 uppercase">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {STORIES.map((story, index) => (
        <StorySection
          key={story.eyebrow}
          story={story}
          index={index}
          background={index % 2 === 0 ? 'ink' : index === 3 ? 'forest' : 'charcoal'}
        />
      ))}

      <ReservationCTA />
    </>
  );
}
