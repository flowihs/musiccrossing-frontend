"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import { LogOut, Settings, User } from "lucide-react";
import styles from "@/components/header/header.module.css";
import Image from "next/image";
import avatar from "@/public/header/avatar.png";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

interface UserProfile {
    username: string;
    email: string;
}

export default function HeaderMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/user/my-profile");
                setUser(response.data);
            } catch (error) {
                console.log(error);
                setUser(null);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

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

    if (!user) {
        return (
            <div className={styles.menu}>
                <button
                    className={styles.loginBtn}
                    onClick={() => router.push("/auth")}
                >
                    Войти
                </button>
            </div>
        );
    }

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
                            <User className={styles.menuItemIcon} size={18} strokeWidth={1.75} />
                            Профиль
                        </li>
                        <li className={styles.menuItem} role="menuitem">
                            <Settings className={styles.menuItemIcon} size={18} strokeWidth={1.75} />
                            Настройки
                        </li>
                        <li
                            className={styles.logoutBtn}
                            role="menuitem"
                            onClick={handleLogout}
                        >
                            <LogOut className={styles.menuItemIcon} size={18} strokeWidth={1.75} />
                            Выйти
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}