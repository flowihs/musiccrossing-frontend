import { TrackCard } from "@/entities/track";

import { HorizontalScroller } from "./horizontal-scroller.client";
import styles from "./track-carousel.module.css";

import type { Track } from "@/entities/track";

interface TrackCarouselProps {
  title: string;
  tracks: Track[];
}

export function TrackCarousel({ title, tracks }: TrackCarouselProps) {
  if (tracks.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <HorizontalScroller>
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </HorizontalScroller>
    </section>
  );
}
