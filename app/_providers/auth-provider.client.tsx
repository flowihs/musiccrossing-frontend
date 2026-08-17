"use client";

import { useEffect } from "react";

import { userApi, useUserStore } from "@/entities/user";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const setInitialized = useUserStore((state) => state.setInitialized);

  useEffect(() => {
    async function initializeUser() {
      try {
        const user = await userApi.getCurrentUser();
        setUser(user);
      } catch {
        clearUser();
      } finally {
        setInitialized();
      }
    }

    void initializeUser();
  }, [clearUser, setInitialized, setUser]);

  return children;
}
