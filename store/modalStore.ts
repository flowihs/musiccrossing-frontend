import { create } from "zustand";

interface ModalStore {
    isAddPlaylistModalOpen: boolean;
    openAddPlaylistModal: () => void;
    closeAddPlaylistModal: () => void;
    toggleAddPlaylistModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isAddPlaylistModalOpen: false,

    openAddPlaylistModal: () => set({ isAddPlaylistModalOpen: true }),

    closeAddPlaylistModal: () => set({ isAddPlaylistModalOpen: false }),

    toggleAddPlaylistModal: () => set((state) => ({
        isAddPlaylistModalOpen: !state.isAddPlaylistModalOpen
    })),
}));
