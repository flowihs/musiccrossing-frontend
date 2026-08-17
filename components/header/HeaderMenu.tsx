"use client";

import clsx from "clsx";
import { LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

import styles from "@/components/header/header.module.css";
import { useUserStore } from "@/entities/user";
import { useLogout } from "@/features/auth";
import avatar from "@/public/header/avatar.png";

export default function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const { logout, isLoading } = useLogout();
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

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
      <div
        ref={avatarRef}
        className={clsx(styles.avatarBtn, isMenuOpen && styles.avatarBtnActive)}
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
      >
        <Image
          className={styles.avatar}
          src={avatar}
          alt={user.username}
          width={42}
          height={42}
        />
      </div>

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
            <li
              className={styles.logoutBtn}
              role="menuitem"
              aria-disabled={isLoading}
              onClick={() => void handleLogout()}
            >
              <LogOut
                className={styles.menuItemIcon}
                size={18}
                strokeWidth={1.75}
              />
              Выйти
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
