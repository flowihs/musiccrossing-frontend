"use client";

import styles from "./header.module.css";
import Image from "next/image";
import logo from "@/public/header/logo.png";
import search from "@/public/header/search.png";
import Link from "next/link";
import clsx from "clsx";
import { Bell, Users } from "lucide-react";
import HeaderMenu from "@/components/header/HeaderMenu";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link className={styles.logoLink} href="/">
                <div className={styles.logo}>
                    <Image className={styles.logoImage} src={logo} alt="MusicShare" />
                    <h1 className={styles.logoTitle}>MusicShare</h1>
                </div>
            </Link>

            <div className={styles.headerSearch}>
                <div className={styles.search}>
                    <Image className={styles.searchIcon} src={search} alt="" />
                    <input
                        className={styles.searchInput}
                        type="text"
                        placeholder="Введите текст..."
                    />
                </div>
            </div>

            <div className={styles.headerActions}>
                <button
                    className={clsx(styles.iconButton, styles.iconButtonSecondary)}
                    type="button"
                >
                    <Bell size={22} strokeWidth={1.75} />
                </button>
                <button
                    className={clsx(styles.iconButton, styles.iconButtonSecondary)}
                    type="button"
                >
                    <Users size={22} strokeWidth={1.75} />
                </button>
                <HeaderMenu />
            </div>
        </header>
    );
}
