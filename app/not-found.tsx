import Link from 'next/link';
import { SmartImage } from '@/components/ui/SmartImage';
import { Button } from '@/components/ui/Button';
import { navigation } from '@/data/restaurant';
import { heroImages } from '@/data/images';

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-20 opacity-35">
        <SmartImage
          src={heroImages.alternate.src}
          alt=""
          sizes="100vw"
          priority
        />
      </div>
      <div aria-hidden="true" className="cinema-veil absolute inset-0 -z-10" />

      <div className="shell relative py-32 text-center">
        <p className="eyebrow">Error 404</p>

        <h1 className="display-xl mx-auto mt-7 max-w-3xl font-display text-cream">
          This corner of the village{' '}
          <span className="text-gold italic">does not exist.</span>
        </h1>

        <p className="lede mx-auto mt-8 max-w-lg">
          The page you were looking for has moved, closed for the night, or never opened
          in the first place.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button href="/" size="lg" withArrow magnetic>
            Back to the village
          </Button>
          <Button href="/menu" variant="outline" size="lg" magnetic>
            View the menu
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-16">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {navigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline font-sans text-[0.6875rem] tracking-[0.22em] text-cream/50 uppercase transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
