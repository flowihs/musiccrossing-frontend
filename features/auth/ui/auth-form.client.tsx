"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Toast } from "@/components/toast/Toast";
import { ToastPortal } from "@/components/toast/ToastPortal";

import styles from "./auth.module.css";
import { getButtonText, getFormConfig } from "./constants";
import { useForgotPassword } from "../model/useForgotPassword";
import { useLogin } from "../model/useLogin";
import { useRegister } from "../model/useRegister";

import type { AuthTab } from "./types";

interface AuthFormProps {
  activeTab: AuthTab;
}

export function AuthForm({ activeTab }: AuthFormProps) {
  const inputs = getFormConfig(activeTab);
  const buttonText = getButtonText(activeTab);
  const router = useRouter();
  const loginState = useLogin();
  const registerState = useRegister();
  const forgotPasswordState = useForgotPassword();
  const [feedback, setFeedback] = useState<{
    title: string;
    message: string;
    isError: boolean;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  const requestError =
    loginState.error ?? registerState.error ?? forgotPasswordState.error;
  const isLoading =
    loginState.isLoading ||
    registerState.isLoading ||
    forgotPasswordState.isLoading;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const login = String(formData.get("login") ?? "");
    const email = String(formData.get("email") ?? "");
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    setFeedback(null);
    loginState.clearError();
    registerState.clearError();
    forgotPasswordState.clearError();

    try {
      if (activeTab === "register" && confirmPassword !== password) {
        setFeedback({
          title: "Registration Error",
          message: "Пароли должны совпадать",
          isError: true,
        });
        return;
      }

      if (activeTab === "login") {
        await loginState.login({ login, password });
        router.push("/");
      } else if (activeTab === "register") {
        await registerState.register({ email, username, password });
        router.push("/");
      } else {
        await forgotPasswordState.requestPasswordReset(email);
        setFeedback({
          title: "Успешно!",
          message: "Письмо для восстановления пароля отправлено на ваш email",
          isError: false,
        });
      }
    } catch {
      // The selected feature hook owns and exposes the normalized API error.
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {(feedback || requestError) && (
        <ToastPortal>
          <Toast
            title={feedback?.title ?? requestError?.title ?? "Ошибка"}
            message={
              feedback?.message ?? requestError?.message ?? "Что-то пошло не так"
            }
            error={feedback?.isError ?? true}
            onClose={() => {
              setFeedback(null);
              loginState.clearError();
              registerState.clearError();
              forgotPasswordState.clearError();
            }}
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

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isLoading}
        >
          {isLoading ? "Загрузка..." : buttonText}
        </button>
      </form>
    </>
  );
}
