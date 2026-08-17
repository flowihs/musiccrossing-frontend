"use client";

import clsx from "clsx";
import { Bell, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useUserStore } from "@/entities/user";
import logo from "@/public/header/logo.png";
import search from "@/public/header/search.png";

import styles from "./header.module.css";
import { ProfileMenu } from "./profile-menu.client";

export function Header() {
  const user = useUserStore((state) => state.user);
  const isUserInitialized = useUserStore((state) => state.isInitialized);

  return (
    <header className={styles.header}>
      <Link className={styles.logoLink} href="/">
        <div className={styles.logo}>
          <Image className={styles.logoImage} src={logo} alt="MusicShare" />
          <h1 className={styles.logoTitle}>MusicShare</h1>
        </div>
      </Link>

      <form className={styles.headerSearch} action="/search">
        <div className={styles.search}>
          <Image className={styles.searchIcon} src={search} alt="" />
          <input
            className={styles.searchInput}
            aria-label="Поиск музыки"
            name="q"
            type="text"
            placeholder="Введите текст..."
          />
        </div>
      </form>

      <div className={styles.headerActions}>
        {!isUserInitialized ? null : !user ? (
          <div className={styles.authLinks}>
            <Link className={styles.signUpLink} href="/auth?tab=register">
              Sign Up
            </Link>
            <Link className={styles.signInLink} href="/auth">
              Sign In
            </Link>
          </div>
        ) : (
          <>
            <button
              className={clsx(styles.iconButton, styles.iconButtonSecondary)}
              type="button"
              aria-label="Уведомления"
            >
              <Bell size={22} strokeWidth={1.75} />
            </button>
            <button
              className={clsx(styles.iconButton, styles.iconButtonSecondary)}
              type="button"
              aria-label="Друзья"
            >
              <Users size={22} strokeWidth={1.75} />
            </button>
            <ProfileMenu />
          </>
        )}
      </div>
    </header>
  );
}
