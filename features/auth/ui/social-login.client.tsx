"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

import { Toast, ToastPortal } from "@/shared/ui/toast";

import styles from "./auth.module.css";
import { useGoogleLogin } from "../model/useGoogleLogin";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: Record<string, unknown>) => void;
          renderButton: (
            element: HTMLElement,
            options: Record<string, unknown>,
          ) => void;
        };
      };
    };
  }
}

interface GoogleCredentialResponse {
  credential: string;
}

interface SocialLoginProps {
  activeTab?: string;
}

export function SocialLogin({ activeTab }: SocialLoginProps) {
  const router = useRouter();
  const { loginWithGoogle, error, clearError } = useGoogleLogin();
  const googleInitialized = useRef(false);

  const handleGoogleCredentialResponse = useCallback(
    async (response: GoogleCredentialResponse) => {
      try {
        await loginWithGoogle(response.credential);
        router.push("/");
      } catch {
        // useGoogleLogin exposes a normalized error for the toast below.
      }
    },
    [loginWithGoogle, router],
  );

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
  }, [handleGoogleCredentialResponse]);

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
            onClose={clearError}
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
