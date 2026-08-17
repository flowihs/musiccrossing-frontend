"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./toast.module.css";

interface ToastProps {
  title: string;
  message: string;
  error: boolean;
  onClose: () => void;
}

export function Toast({
  title,
  message,
  error,
  onClose,
}: ToastProps) {
  const variantClass = error ? styles.modalError : styles.modalSuccess;
  const iconClass = error
    ? styles.iconContainerError
    : styles.iconContainerSuccess;
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = useCallback(() => {
    if (closeTimerRef.current) {
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const autoCloseTimer = setTimeout(handleClose, 5000);

    return () => {
      clearTimeout(autoCloseTimer);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [handleClose]);

  return (
    <div
      className={`${styles.modal} ${variantClass} ${isClosing ? styles.closing : ""}`}
      role={error ? "alert" : "status"}
      aria-live={error ? "assertive" : "polite"}
    >
      <div
        className={`${styles.iconContainer} ${iconClass}`}
        aria-hidden="true"
      >
        {error ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
              fill="rgba(255,255,255,0.06)"
            />
            <path
              d="M12 7v6"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 17h.01"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20z"
              fill="rgba(255,255,255,0.06)"
            />
            <path
              d="M9 12.5l1.8 1.8L15 10"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <div className={styles.textContainer}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{message}</p>
      </div>

      <button
        type="button"
        className={styles.closeButton}
        aria-label="Закрыть уведомление"
        onClick={handleClose}
      >
        ×
      </button>
    </div>
  );
}
