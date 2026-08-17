"use client";

import { useCallback, useState } from "react";

import { userApi, useUserStore } from "@/entities/user";

import { getAuthError } from "./auth-error";
import { authApi } from "../api/auth.api";

import type { AuthError } from "./auth-error";

export function useGoogleLogin() {
  const setUser = useUserStore((state) => state.setUser);
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = useCallback(
    async (idToken: string) => {
      setIsLoading(true);
      setError(null);

      try {
        await authApi.loginWithGoogle(idToken);
        const user = await userApi.getCurrentUser();
        setUser(user);
        return user;
      } catch (requestError: unknown) {
        setError(
          getAuthError(requestError, "Не удалось войти через Google"),
        );
        throw requestError;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser],
  );

  return {
    loginWithGoogle,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
