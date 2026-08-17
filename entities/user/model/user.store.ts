"use client";

import { create } from "zustand";

import type { User } from "./types";

interface UserStore {
  user: User | null;
  isInitialized: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setInitialized: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isInitialized: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setInitialized: () => set({ isInitialized: true }),
}));
