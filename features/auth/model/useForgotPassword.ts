"use client";

import { useCallback, useState } from "react";

import { getAuthError } from "./auth-error";
import { authApi } from "../api/auth.api";

import type { AuthError } from "./auth-error";

export function useForgotPassword() {
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestPasswordReset = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.requestPasswordReset(email);
    } catch (requestError: unknown) {
      setError(
        getAuthError(requestError, "Не удалось отправить письмо для сброса"),
      );
      throw requestError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    requestPasswordReset,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
