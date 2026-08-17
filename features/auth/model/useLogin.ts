"use client";

import { useCallback, useState } from "react";

import { userApi, useUserStore } from "@/entities/user";


import { getAuthError } from "./auth-error";
import { authApi } from "../api/auth.api";

import type { AuthError } from "./auth-error";
import type { LoginScheme } from "@/entities/user";

export function useLogin() {
  const setUser = useUserStore((state) => state.setUser);
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (credentials: LoginScheme) => {
      setIsLoading(true);
      setError(null);

      try {
        await authApi.login(credentials);
        const user = await userApi.getCurrentUser();
        setUser(user);
        return user;
      } catch (requestError: unknown) {
        setError(getAuthError(requestError, "Не удалось войти в аккаунт"));
        throw requestError;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser],
  );

  return { login, isLoading, error, clearError: () => setError(null) };
}
