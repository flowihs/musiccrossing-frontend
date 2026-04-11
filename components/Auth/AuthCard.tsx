"use client";

import { useState } from "react";
import styles from "./auth.module.css";
import { AuthTab } from "./types";

import { BackButton } from "./BackButton";
import { AuthTabs } from "./AuthTabs";
import { AuthForm } from "./AuthForm";
import { SocialLogin } from "./SocialLogin";

export function AuthCard() {
    const [activeTab, setActiveTab] = useState<AuthTab>("login");

    return (
        <section className={styles.authCard}>
            <div className={styles.cardBody}>
                <h1 className={styles.title}>MusicShare</h1>

                {
                    activeTab === "resetPassword" && (
                        <BackButton onClick={() => setActiveTab("login")} />
                    )
                }

                {
                    (activeTab === "login" || activeTab === "register") && (
                        <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    )
                }

                <AuthForm activeTab={activeTab} />

                {activeTab === "login" && (
                    <>
                        <button
                            type="button"
                            className={styles.forgotPasswordLink}
                            onClick={() => setActiveTab("resetPassword")}
                            style={{ background: 'none', border: 'none' }}
                        >
                            Забыли пароль?
                        </button>
                        <SocialLogin />
                    </>
                )}
            </div>
        </section>
    );
}