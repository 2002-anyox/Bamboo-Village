import { ImageResponse } from 'next/og';
import { restaurantConfig } from '@/data/restaurant';

/**
 * Social sharing card, generated at build time — no design tool needed.
 * Replace this file with a static `opengraph-image.jpg` (1200×630) once the
 * venue has hero photography it wants used on social previews.
 */

export const runtime = 'nodejs';
/** Rendered once at build time — required for the static Pages export. */
export const dynamic = 'force-static';
export const alt = 'Bamboo Village — Restaurant, Bar & Dining Experience';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'linear-gradient(135deg, #0B2B20 0%, #101412 55%, #070A09 100%)',
          color: '#F5EBDD',
        }}
      >
        {/* Top rule + eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 2, background: '#D6A84F' }} />
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: '#D6A84F',
            }}
          >
            {`${restaurantConfig.address.city}, ${restaurantConfig.address.country}`}
          </div>
        </div>

        {/* Wordmark + line */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 96,
              letterSpacing: 6,
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Bamboo
          </div>
          <div
            style={{
              fontSize: 96,
              letterSpacing: 6,
              textTransform: 'uppercase',
              lineHeight: 1,
              color: '#D6A84F',
            }}
          >
            Village
          </div>
          <div
            style={{
              marginTop: 34,
              fontSize: 34,
              color: '#E8D3A3',
              letterSpacing: 1,
            }}
          >
            Good food. Good drinks. Good vibes.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(214,168,79,0.35)',
            paddingTop: 28,
            fontSize: 20,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'rgba(245,235,221,0.65)',
          }}
        >
          <div style={{ display: 'flex' }}>Restaurant · Bar · Events</div>
          <div style={{ display: 'flex', color: '#D6A84F' }}>Reserve · Order · Enjoy</div>
        </div>
      </div>
    ),
    size,
  );
}
