"use client";

import styles from "./sidebar.module.css";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { HomeIcon, LibraryIcon, SearchNavIcon } from "@/components/header/NavigationIcons";
import search from "@/public/header/search.png";
import playlistImage from "@/public/header/navigation/playlist-image.png";

const NAV_ITEMS = [
  { name: "Главная", href: "/", Icon: HomeIcon },
  { name: "Поиск", href: "/search", Icon: SearchNavIcon },
  { name: "Плейлист", href: "/library", Icon: LibraryIcon },
] as const;

const MY_PLAYLISTS = [
  { id: 1, name: "Любимая музыка", trackCount: 1 },
  { id: 2, name: "Для тренировки", trackCount: 24 },
  { id: 3, name: "В дорогу", trackCount: 18 },
  { id: 4, name: "Релакс", trackCount: 42 },
  { id: 5, name: "Новинки", trackCount: 7 },
] as const;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar} >
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
                className={clsx(styles.navIndicator, isActive && styles.navIndicatorActive)}
              />
              <Icon className={styles.navIcon} />
              <span className={styles.navLabel}>{name}</span>
            </Link>
          );
        })}
      </div>

      <section className={styles.library}>
        <div className={styles.libraryTop}>
          <div className={styles.libraryHeader}>
            <h2 className={styles.libraryTitle}>Мои библиотеки</h2>
            <button
              className={styles.libraryAddBtn}
              type="button"
            >
              <Plus className={styles.libraryAddIcon} size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div className={clsx(styles.search, styles.librarySearch)}>
            <Image className={clsx(styles.searchIcon, styles.librarySearchIcon)} src={search} alt="" />
            <input
              className={clsx(styles.searchInput, styles.librarySearchInput)}
              type="text"
              placeholder="Введите текст..."
            />
          </div>
        </div>

        <ul className={styles.playlistList}>
          {MY_PLAYLISTS.map((playlist) => (
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
                <p className={styles.playlistMeta}>{playlist.trackCount} треков</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
}
