import { create } from "zustand";
import { persist } from "zustand/middleware";

import { userServices } from '@/entities/user/';

import type { User } from '@/entities/user/model/types';

interface UserStore {
    user: User | null;

    setUser: (user: User) => void,
    clearUser: () => void,
    updateUser: () => Promise<void>
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,

            setUser: (user: User) => set({ user }),
            clearUser: () => set({ user: null }),

            updateUser: async () => {
                const profile = await userServices.getMyProfile();
                set({ user: profile });
            },
        }),
        {
            name: 'global-storage',
        }
    )
)