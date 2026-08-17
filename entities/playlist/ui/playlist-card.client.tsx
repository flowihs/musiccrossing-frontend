"use client";

import Image from "next/image";
import Link from "next/link";

import fallbackCover from "@/public/rectangle.png";

import styles from "./playlist-card.module.css";

import type { Playlist } from "../model/types";

interface PlaylistCardProps {
  playlist: Playlist;
  href: string;
}

export function PlaylistCard({ playlist, href }: PlaylistCardProps) {
  return (
    <Link className={styles.link} href={href}>
      <article className={styles.card}>
        <Image
          className={styles.cover}
          src={playlist.coverUrl || fallbackCover}
          alt=""
          width={85}
          height={85}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{playlist.name}</h3>
          <p className={styles.meta}>{playlist.trackCount ?? 0} треков</p>
        </div>
      </article>
    </Link>
  );
}
