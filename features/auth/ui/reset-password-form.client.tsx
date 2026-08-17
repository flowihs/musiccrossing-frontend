"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";


import { Toast } from "@/components/toast/Toast";
import { ToastPortal } from "@/components/toast/ToastPortal";


import styles from "./reset-password.module.css";
import { authApi } from "../api/auth.api";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<{ title: string; message: string } | null>(
    null,
  );
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      return;
    }

    if (password !== confirmPassword) {
      setError({
        title: "Ошибка",
        message: "Пароли не совпадают",
      });
      return;
    }

    if (password.length < 6) {
      setError({
        title: "Ошибка",
        message: "Пароль должен быть не менее 6 символов",
      });
      return;
    }

    setLoading(true);

    try {
      await authApi.resetPassword(token, password);

      setSuccess(true);
      setError(null);

      setTimeout(() => {
        router.push("/auth");
      }, 3000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError({
          title: "Ошибка сброса пароля",
          message:
            err.response?.data?.message ||
            "Что-то пошло не так. Попробуйте снова.",
        });
      } else {
        setError({
          title: "Ошибка",
          message: "Что-то пошло не так",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className={styles.authCard}>
        <div className={styles.cardBody}>
          <h1 className={styles.title}>MusicShare</h1>
          <div className={styles.formElement}>
            <div className={styles.formWrapper}>
              <p className={styles.errorText}>Неверная ссылка</p>
              <p className={styles.infoText}>
                Отсутствует токен для сброса пароля.
              </p>
            </div>
            <button
              onClick={() => router.push("/auth")}
              className={styles.submitBtn}
            >
              Вернуться на страницу входа
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className={styles.authCard}>
        <div className={styles.cardBody}>
          <h1 className={styles.title}>MusicShare</h1>
          <div className={styles.formElement}>
            <div className={styles.formWrapper}>
              <div className={styles.successIcon}>✓</div>
              <p className={styles.successText}>Пароль успешно изменён!</p>
              <p className={styles.infoText}>
                Теперь вы можете войти с новым паролем.
              </p>
            </div>
            <button
              onClick={() => router.push("/auth")}
              className={styles.submitBtn}
            >
              Перейти к авторизации
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {error && (
        <ToastPortal>
          <Toast
            title={error.title}
            message={error.message}
            error={true}
            onClose={() => setError(null)}
          />
        </ToastPortal>
      )}

      <div className={styles.authCard}>
        <div className={styles.cardBody}>
          <h1 className={styles.title}>MusicShare</h1>
          <h2 className={styles.subtitle}>Создание нового пароля</h2>
          <div className={styles.line}></div>
          <form onSubmit={handleSubmit} className={styles.formElement}>
            <div className={styles.formWrapper}>
              <input
                type="password"
                name="password"
                placeholder="Новый пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                required
                minLength={6}
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Сохранение..." : "Сохранить пароль"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
