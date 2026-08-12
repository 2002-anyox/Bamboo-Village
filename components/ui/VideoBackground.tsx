'use client';

import { useEffect, useRef, useState } from 'react';
import { SmartImage } from './SmartImage';
import { cn } from '@/lib/utils';

/**
 * ---------------------------------------------------------------------------
 * VideoBackground — reusable cinematic background video.
 * ---------------------------------------------------------------------------
 * • autoPlay / muted / loop / playsInline, as required for silent autoplay
 * • Never blocks first paint: the poster image renders immediately and the
 *   video only starts downloading once the section is near the viewport
 * • Falls back to the poster when there is no source, when autoplay is
 *   refused, when the file fails, or when the guest prefers reduced motion
 *
 * To use: drop an .mp4 in /public/video and set the `src` in data/images.ts.
 * ---------------------------------------------------------------------------
 */

export function VideoBackground({
  src,
  poster,
  posterAlt,
  posterFocal,
  className,
  /** Adds the slow drift to the poster when no video is playing. */
  animatePoster = true,
  priority = false,
}: {
  src?: string;
  poster: string;
  posterAlt: string;
  posterFocal?: string;
  className?: string;
  animatePoster?: boolean;
  priority?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  const hasSource = Boolean(src && src.trim().length > 0);

  // Only fetch the video once the section is close to the viewport.
  useEffect(() => {
    if (!hasSource || !containerRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasSource]);

  // Pause when off-screen so a background video never costs battery silently.
  useEffect(() => {
    if (!playing || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;
          if (!video) return;
          if (entry.isIntersecting) void video.play().catch(() => undefined);
          else video.pause();
        });
      },
      { threshold: 0.05 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [playing]);

  return (
    <div ref={containerRef} className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Poster — always present, so there is never an empty frame. */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-1000',
          playing ? 'opacity-0' : 'opacity-100',
          animatePoster && !playing && 'ken-burns',
        )}
      >
        <SmartImage
          src={poster}
          alt={posterAlt}
          focal={posterFocal}
          sizes="100vw"
          priority={priority}
        />
      </div>

      {hasSource && shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onError={() => setPlaying(false)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
            playing ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </div>
  );
}
