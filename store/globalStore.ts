import { userServices } from "@/lib/helpers/getMyProfile";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  username: string;
  email: string;
}

interface GlobalStore {
  isLoading: boolean;
  error: string | null;
  user: User | null;

  setLoading: (bool: boolean) => void;
  setError: (err: string | null) => void;

  setUser: (user: User) => void;
  clearUser: () => void;

  handleLogout: () => Promise<void>;
  updateUser: () => Promise<void>;
}

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      error: null,
      user: null,

      setLoading: (bool) => set({ isLoading: bool }),
      setError: (err) => set({ error: err }),

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      handleLogout: async () => {
        try {
          set({ isLoading: true, error: null });

          await userServices.logout();

          get().clearUser();
        } catch (error) {
          console.error(error);
          set({ error: "ошибка при выходе из аккаунта" });
        } finally {
          set({ isLoading: false });
        }
      },

      updateUser: async () => {
        const profile = await userServices.getMyProfile();
        set({ user: profile });
      },
    }),
    {
      name: "global-storage",
    },
  ),
);
