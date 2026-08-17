"use client";

import clsx from "clsx";
import { LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

import { useUserStore } from "@/entities/user";
import { useLogout } from "@/features/auth";
import avatar from "@/public/header/avatar.png";

import styles from "./header.module.css";

export function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const { logout, isLoading } = useLogout();
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch {
      // The hook exposes the request error for the future shared toast layer.
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedOutsideMenu =
        menuRef.current && !menuRef.current.contains(target);
      const clickedOutsideAvatar =
        avatarRef.current && !avatarRef.current.contains(target);

      if (clickedOutsideMenu && clickedOutsideAvatar && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.menu}>
      <button
        type="button"
        ref={avatarRef}
        className={clsx(styles.avatarBtn, isMenuOpen && styles.avatarBtnActive)}
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        aria-label="Открыть меню профиля"
        onClick={toggleMenu}
      >
        <Image
          className={styles.avatar}
          src={avatar}
          alt={user.username}
          width={42}
          height={42}
        />
      </button>

      {isMenuOpen && (
        <div ref={menuRef} className={styles.profileMenu} role="menu">
          <div className={styles.profileInfo}>
            <p className={styles.profileName}>{user.username}</p>
            <p className={styles.profileEmail}>{user.email}</p>
          </div>

          <div className={styles.menuDivider} />

          <ul className={styles.menuList}>
            <li className={styles.menuItem} role="menuitem">
              <User
                className={styles.menuItemIcon}
                size={18}
                strokeWidth={1.75}
              />
              Профиль
            </li>
            <li className={styles.menuItem} role="menuitem">
              <Settings
                className={styles.menuItemIcon}
                size={18}
                strokeWidth={1.75}
              />
              Настройки
            </li>
            <li role="none">
              <button
                type="button"
                className={styles.logoutBtn}
                role="menuitem"
                disabled={isLoading}
                onClick={() => void handleLogout()}
              >
                <LogOut
                  className={styles.menuItemIcon}
                  size={18}
                  strokeWidth={1.75}
                />
                {isLoading ? "Выход..." : "Выйти"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
