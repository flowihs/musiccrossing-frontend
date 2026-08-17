"use client";

import { useState } from "react";

import { AuthForm } from "./auth-form.client";
import { AuthTabs } from "./auth-tabs";
import styles from "./auth.module.css";
import { BackButton } from "./back-button";
import { SocialLogin } from "./social-login.client";

import type { AuthTab } from "./types";

export function AuthCard({ initialTab = "login" }: { initialTab?: AuthTab }) {
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);

  return (
    <section className={styles.authCard}>
      <div className={styles.cardBody}>
        <h1 className={styles.title}>MusicShare</h1>

        {activeTab === "resetPassword" && (
          <BackButton onClick={() => setActiveTab("login")} />
        )}

        {(activeTab === "login" || activeTab === "register") && (
          <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        <AuthForm activeTab={activeTab} />

        {activeTab === "login" && (
          <>
            <button
              type="button"
              className={styles.forgotPasswordLink}
              onClick={() => setActiveTab("resetPassword")}
            >
              Забыли пароль?
            </button>
            {/* Передаем activeTab для перерендера */}
            <SocialLogin activeTab={activeTab} />
          </>
        )}
      </div>
    </section>
  );
}
