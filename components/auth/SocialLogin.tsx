"use client";

import styles from "./auth.module.css";
import { api } from "@/shared/api/client/axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Toast } from "@/components/toast/Toast";
import { ToastPortal } from "@/components/toast/ToastPortal";

declare global {
  interface Window {
    google?: any;
  }
}

interface SocialLoginProps {
  activeTab?: string;
}

export function SocialLogin({ activeTab }: SocialLoginProps) {
  const router = useRouter();
  const [error, setError] = useState<{ title: string; message: string } | null>(
    null,
  );
  const googleInitialized = useRef(false);

  const handleGoogleCredentialResponse = async (response: any) => {
    try {
      const res = await api.post("/auth/google", {
        idToken: response.credential,
      });

      if (res.status === 200) {
        router.push("/");
      }
    } catch (error: any) {
      setError({
        title: "Ошибка авторизации",
        message:
          error.response?.data?.message || "Не удалось войти через Google",
      });
    }
  };

  const renderGoogleButton = useCallback(() => {
    const element = document.getElementById("google-login-button");
    if (!element) return;

    if (
      typeof window !== "undefined" &&
      window.google &&
      !googleInitialized.current
    ) {
      try {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        googleInitialized.current = true;
      } catch {}
    }

    if (element && window.google) {
      element.innerHTML = "";
      window.google.accounts.id.renderButton(element, {
        theme: "outline",
        size: "large",
        width: "100%",
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "center",
      });
    }
  }, []);

  useEffect(() => {
    const loadGoogleScript = () => {
      if (document.querySelector("#google-script")) {
        renderGoogleButton();
        return;
      }

      const script = document.createElement("script");
      script.id = "google-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        renderGoogleButton();
      };
      document.body.appendChild(script);
    };

    loadGoogleScript();
  }, [renderGoogleButton]);

  useEffect(() => {
    if (window.google) {
      setTimeout(() => {
        renderGoogleButton();
      }, 50);
    }
  }, [activeTab, renderGoogleButton]);

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

      <div className={styles.socialSection}>
        <div className={styles.socialWrapper}>
          <div id="google-login-button" className={styles.googleButton}></div>
        </div>
      </div>
    </>
  );
}
