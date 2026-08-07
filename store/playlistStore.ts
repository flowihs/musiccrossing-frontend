import { create } from "zustand";
import { api } from "@/lib/axios";

interface Playlist {
  id: number;
  name: string;
}

interface PlaylistStore {
  playlists: Playlist[];
  isLoading: boolean;
  error: string | null;

  setPlaylists: (playlists: Playlist[]) => void;
  addPlaylist: (playlist: Playlist) => void;
  removePlaylist: (id: number) => void;
  fetchPlaylists: () => Promise<void>;
  createPlaylist: (name: string) => Promise<void>;
}

export const usePlaylistStore = create<PlaylistStore>((set, get) => ({
  playlists: [],
  isLoading: false,
  error: null,

  setPlaylists: (playlists) => set({ playlists }),

  addPlaylist: (playlist) =>
    set((state) => ({
      playlists: [...state.playlists, playlist],
    })),

  removePlaylist: (id) =>
    set((state) => ({
      playlists: state.playlists.filter((p) => p.id !== id),
    })),

  fetchPlaylists: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get("/playlists/getByUser");
      set({ playlists: response.data, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ error: "Ошибка загрузки плейлистов", isLoading: false });
    }
  },

  createPlaylist: async (name: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post("/playlists/create", { name });

      get().addPlaylist(response.data);
      set({ isLoading: false });
    } catch (error: any) {
      console.error(error);
      set({
        error: error.response?.data?.message || "Ошибка создания плейлиста",
        isLoading: false,
      });
      throw error;
    }
  },
}));
