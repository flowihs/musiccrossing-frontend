import styles from "./auth.module.css";

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      type="button"
      className={styles.backBtn}
      onClick={onClick}
      style={{ background: "none", border: "none" }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M19 12H5M5 12L12 19M5 12L12 5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Вернуться назад
    </button>
  );
}
