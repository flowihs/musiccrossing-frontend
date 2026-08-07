import { create } from "zustand";
import { nanoid } from "nanoid";

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: "success" | "error";
}

interface ToastStore {
  toasts: ToastItem[];

  showSuccess: (message: string, title: string) => void;
  showError: (message: string, title: string) => void;

  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  showSuccess: (message, title) => {
    const id = nanoid();
    const newToast: ToastItem = {
      id,
      title,
      message,
      type: "success",
    };

    set({
      toasts: [...get().toasts, newToast],
    });
  },
  showError: (message, title) => {
    const id = nanoid();
    const newToast: ToastItem = {
      id,
      title,
      message,
      type: "error",
    };

    set({
      toasts: [...get().toasts, newToast],
    });
  },
  removeToast: (id) => {
    set({
      toasts: get().toasts.filter((i) => i.id !== id),
    });
  },
}));
