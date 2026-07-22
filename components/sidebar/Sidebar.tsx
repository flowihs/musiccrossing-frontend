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
import { useEffect, useState, useRef } from "react";
import { usePlaylistStore } from "@/store/playlistStore";
import { useModalStore } from "@/store/modalStore";
import { useGlobalStore } from "@/store/globalStore";

export default function Sidebar() {
    const pathname = usePathname();
    const user = useGlobalStore((state) => state.user);
    const { playlists, fetchPlaylists } = usePlaylistStore();
    const openAddPlaylistModal: () => void = useModalStore((state) => state.openAddPlaylistModal);

    const [visibleCount, setVisibleCount] = useState(10);
    const loaderRef = useRef<HTMLLIElement | null>(null);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredPlaylists = playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        setVisibleCount(10);
    }, [searchQuery]);

    const NAV_ITEMS = [
        { name: "Главная", href: "/", Icon: HomeIcon },
        { name: "Поиск", href: "/search", Icon: SearchNavIcon },
        { name: "Плейлист", href: "/library", Icon: LibraryIcon },
    ] as const;

    useEffect(() => {
        fetchPlaylists();
    }, [fetchPlaylists]);

    useEffect(() => {
        if (!loaderRef.current || filteredPlaylists.length <= visibleCount) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + 10, filteredPlaylists.length));
                }
            },
            {
                root: loaderRef.current.parentElement,
                rootMargin: "50px",
                threshold: 0.1
            }
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
                  className={clsx(styles.navIndicator, isActive && styles.navIndicatorActive)}
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
                            <button
                                onClick={() => openAddPlaylistModal()}
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <ul className={styles.playlistList}>
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
                                    <p className={styles.playlistMeta}>{"1"} треков</p>
                                </div>
                            </li>
                        ))}

                        {filteredPlaylists.length > visibleCount && (
                            <li ref={loaderRef} style={{ height: "1px", listStyle: "none" }} />
                        )}
                    </ul>
                </section>
            )}
        </nav>
    );
}
