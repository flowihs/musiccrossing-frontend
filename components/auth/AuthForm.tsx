"use client";

import styles from "./auth.module.css";
import { AuthTab } from "./types";
import { FORM_CONFIG, BUTTON_TEXTS } from "./constants";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Toast } from "@/components/toast/Toast";
import { ToastPortal } from "@/components/toast/ToastPortal";
import axios from "axios";
import { useGlobalStore } from "@/store/globalStore";

interface AuthFormProps {
  activeTab: AuthTab;
}

export function AuthForm({ activeTab }: AuthFormProps) {
  const inputs = FORM_CONFIG[activeTab];
  const buttonText = BUTTON_TEXTS[activeTab];
  const router = useRouter();
  const updateUser = useGlobalStore((state) => state.updateUser);
  const [error, setError] = useState<{ title: string; message: string } | null>(
    null,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload =
      activeTab === "login"
        ? {
            login: formData.get("login"),
            password: formData.get("password"),
          }
        : activeTab === "register"
          ? {
              email: formData.get("email"),
              username: formData.get("username"),
              password: formData.get("password"),
            }
          : {
              email: formData.get("email"),
            };

    const confirmPassword = formData.get("confirmPassword");

    try {
      if (confirmPassword !== payload.password && activeTab === "register") {
        setError({
          title: "Registration Error",
          message: "Пароли должны совпадать",
        });
        return;
      }

      if (activeTab === "login") {
        const response = await api.post("/auth/login", payload);
        if (response.status === 200) {
          await updateUser();
          router.push("/");
        }
      } else if (activeTab === "register") {
        const response = await api.post("/auth/register", payload);
        if (response.status === 200) {
          await updateUser();
          router.push("/");
        }
      } else {
        await api.post("/user/forgot-password", payload);
        setError({
          title: "Успешно!",
          message: "Письмо для восстановления пароля отправлено на ваш email",
        });
      }
    } catch (err: unknown) {
      console.error("Error:", err);
      if (axios.isAxiosError(err)) {
        setError({
          title: err.response?.data?.error || "Ошибка",
          message: err.response?.data?.messages || "Что-то пошло не так",
        });
      } else {
        setError({
          title: "Ошибка",
          message: "Что-то пошло не так",
        });
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {error && (
        <ToastPortal>
          <Toast
            title={error.title}
            message={error.message}
            error={error.title !== "Успешно!"}
            onClose={() => setError(null)}
          />
        </ToastPortal>
      )}

      <form onSubmit={handleSubmit} className={styles.formElement}>
        <div className={styles.formWrapper}>
          {inputs.map((field) => (
            <input
              key={field.name}
              name={field.name}
              className={styles.inputField}
              placeholder={field.placeholder}
              type={field.type}
              required
            />
          ))}
        </div>

        <button type="submit" className={styles.submitBtn}>
          {buttonText}
        </button>
      </form>
    </>
  );
}
