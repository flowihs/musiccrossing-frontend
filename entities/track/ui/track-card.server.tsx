import Image from "next/image";

import playIcon from "@/public/polygon.svg";

import styles from "./track-card.module.css";

import type { Track } from "../model/types";

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.coverContainer}>
        <Image
          className={styles.cover}
          src={track.coverUrl}
          alt={`Обложка трека «${track.title}»`}
          width={180}
          height={180}
          draggable={false}
        />
        <span className={styles.playIndicator} aria-hidden="true">
          <Image src={playIcon} alt="" draggable={false} />
        </span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{track.title}</h3>
        <p className={styles.artist}>{track.artist}</p>
      </div>
    </article>
  );
}
