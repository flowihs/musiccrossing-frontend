"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import { LogOut, Settings, User } from "lucide-react";
import styles from "@/components/header/header.module.css";
import Image from "next/image";
import avatar from "@/public/header/avatar.png";

export default function HeaderMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(target);
            const clickedOutsideAvatar = avatarRef.current && !avatarRef.current.contains(target);

            if (clickedOutsideMenu && clickedOutsideAvatar && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

    return (
        <div className={styles.menu}>
            <div
                ref={avatarRef}
                className={clsx(styles.avatarBtn, isMenuOpen && styles.avatarBtnActive)}
                onClick={toggleMenu}
                role="button"
                tabIndex={0}
                aria-expanded={isMenuOpen}
                aria-haspopup="menu"
            >
                <Image
                    className={styles.avatar}
                    src={avatar}
                    alt="Профиль"
                    width={42}
                    height={42}
                />
            </div>

            {isMenuOpen && (
                <div ref={menuRef} className={styles.profileMenu} role="menu">
                    <div className={styles.profileInfo}>
                        <p className={styles.profileName}>Arseniy</p>
                        <p className={styles.profileEmail}>sabianin123@gmail.com</p>
                    </div>

                    <div className={styles.menuDivider} />

                    <ul className={styles.menuList}>
                        <li className={styles.menuItem} role="menuitem">
                            <User className={styles.menuItemIcon} size={18} strokeWidth={1.75} />
                            Профиль
                        </li>
                        <li className={styles.menuItem} role="menuitem">
                            <Settings className={styles.menuItemIcon} size={18} strokeWidth={1.75} />
                            Настройки
                        </li>
                        <li className={styles.logoutBtn} role="menuitem">
                            <LogOut className={styles.menuItemIcon} size={18} strokeWidth={1.75} />
                            Выйти
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
