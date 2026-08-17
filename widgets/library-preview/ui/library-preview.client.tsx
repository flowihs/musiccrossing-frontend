"use client";

import { PlaylistCard, usePlaylistStore } from "@/entities/playlist";
import { useUserStore } from "@/entities/user";

import styles from "./library-preview.module.css";

interface LibraryPreviewProps {
  title?: string;
  limit?: number;
}

export function LibraryPreview({
  title = "Мои библиотеки",
  limit = 4,
}: LibraryPreviewProps) {
  const user = useUserStore((state) => state.user);
  const playlists = usePlaylistStore((state) => state.playlists);
  const isLoading = usePlaylistStore((state) => state.isLoading);
  const error = usePlaylistStore((state) => state.error);

  if (!user) {
    return null;
  }

  const visiblePlaylists = playlists.slice(0, limit);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      {isLoading && playlists.length === 0 && (
        <p className={styles.status}>Загрузка...</p>
      )}
      {error && playlists.length === 0 && (
        <p className={styles.error}>{error}</p>
      )}
      {!isLoading && !error && visiblePlaylists.length === 0 && (
        <p className={styles.status}>У вас пока нет плейлистов</p>
      )}

      {visiblePlaylists.length > 0 && (
        <div className={styles.grid}>
          {visiblePlaylists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              href={`/library?playlist=${playlist.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
