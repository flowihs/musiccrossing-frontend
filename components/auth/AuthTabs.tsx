import styles from "./auth.module.css";
import { AuthTab } from "./types";

interface AuthTabsProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
}

export function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
  return (
    <div className={styles.tabsWrapper}>
      <div
        className={`
                ${styles.tabHighlight} 
                ${activeTab === "login" ? styles.tabHighlightLogin : styles.tabHighlightRegister}
            `}
      />

      <button
        type="button"
        className={`${styles.tabButton} ${activeTab === "login" ? styles.tabButtonActive : ""}`}
        onClick={() => onTabChange("login")}
      >
        Авторизация
      </button>

      <button
        type="button"
        className={`${styles.tabButton} ${activeTab === "register" ? styles.tabButtonActive : ""}`}
        onClick={() => onTabChange("register")}
      >
        Регистрация
      </button>
    </div>
  );
}
