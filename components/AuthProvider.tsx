"use client";

import { api } from "@/shared/api/client/axios";
import { userServices } from "@/lib/helpers/getMyProfile";
import { useGlobalStore } from "@/store/globalStore";
import { useEffect, useState } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useGlobalStore((state) => state.setUser);
  const setError = useGlobalStore((state) => state.setError);
  const setLoading = useGlobalStore((state) => state.setLoading);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profile = await userServices.getMyProfile();
        setUser(profile);
      } catch (error) {
        console.log(error);
        setError("ошибка при инициализации данных");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return <>{children}</>;
}
