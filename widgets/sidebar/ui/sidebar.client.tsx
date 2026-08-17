"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import { usePlaylistStore } from "@/entities/playlist";
import { useUserStore } from "@/entities/user";
import { CreatePlaylistButton } from "@/features/create-playlist";
import playlistImage from "@/public/header/navigation/playlist-image.png";
import search from "@/public/header/search.png";

import { HomeIcon, LibraryIcon, SearchNavIcon } from "./navigation-icons";
import styles from "./sidebar.module.css";

const NAV_ITEMS = [
  { name: "Главная", href: "/", Icon: HomeIcon },
  { name: "Поиск", href: "/search", Icon: SearchNavIcon },
  { name: "Плейлист", href: "/library", Icon: LibraryIcon },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  const user = useUserStore((state) => state.user);
  const playlists = usePlaylistStore((state) => state.playlists);
  const loadPlaylists = usePlaylistStore((state) => state.loadPlaylists);
  const clearPlaylists = usePlaylistStore((state) => state.clearPlaylists);
  const isLoading = usePlaylistStore((state) => state.isLoading);
  const error = usePlaylistStore((state) => state.error);

  const [visibleCount, setVisibleCount] = useState(10);
  const loaderRef = useRef<HTMLLIElement | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery]);

  useEffect(() => {
    clearPlaylists();

    if (user?.id) {
      void loadPlaylists();
    }

    return clearPlaylists;
  }, [clearPlaylists, loadPlaylists, user?.id]);

  useEffect(() => {
    if (!loaderRef.current || filteredPlaylists.length <= visibleCount) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + 10, filteredPlaylists.length),
          );
        }
      },
      {
        root: loaderRef.current.parentElement,
        rootMargin: "50px",
        threshold: 0.1,
      },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [filteredPlaylists.length, visibleCount]);

  const visiblePlaylists = filteredPlaylists.slice(0, visibleCount);

  return (
    <nav className={styles.sidebar}>
      <div className={styles.navMenu}>
        {NAV_ITEMS.map(({ name, href, Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={clsx(styles.navLink, isActive && styles.navLinkActive)}
            >
              <span
                className={clsx(
                  styles.navIndicator,
                  isActive && styles.navIndicatorActive,
                )}
              />
              <Icon className={styles.navIcon} />
              <span className={styles.navLabel}>{name}</span>
            </Link>
          );
        })}
      </div>
      {user && (
        <section className={styles.library}>
          <div className={styles.libraryTop}>
            <div className={styles.libraryHeader}>
              <h2 className={styles.libraryTitle}>Мои библиотеки</h2>
              <CreatePlaylistButton
                className={styles.libraryAddBtn}
                iconClassName={styles.libraryAddIcon}
              />
            </div>

            <div className={clsx(styles.search, styles.librarySearch)}>
              <Image
                className={clsx(styles.searchIcon, styles.librarySearchIcon)}
                src={search}
                alt=""
              />
              <input
                className={clsx(styles.searchInput, styles.librarySearchInput)}
                type="text"
                placeholder="Введите текст..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ul className={styles.playlistList}>
            {isLoading && playlists.length === 0 && (
              <li className={styles.playlistStatus}>Загрузка...</li>
            )}

            {error && playlists.length === 0 && (
              <li className={styles.playlistError}>{error}</li>
            )}

            {!isLoading && !error && filteredPlaylists.length === 0 && (
              <li className={styles.playlistStatus}>Плейлисты не найдены</li>
            )}

            {visiblePlaylists.map((playlist) => (
              <li className={styles.playlistItem} key={playlist.id}>
                <Image
                  className={styles.playlistCover}
                  src={playlistImage}
                  alt=""
                  width={52}
                  height={52}
                />
                <div className={styles.playlistInfo}>
                  <p className={styles.playlistName}>{playlist.name}</p>
                  <p className={styles.playlistMeta}>
                    {playlist.trackCount ?? 0} треков
                  </p>
                </div>
              </li>
            ))}

            {filteredPlaylists.length > visibleCount && (
              <li
                ref={loaderRef}
                style={{ height: "1px", listStyle: "none" }}
              />
            )}
          </ul>
        </section>
      )}
    </nav>
  );
}
