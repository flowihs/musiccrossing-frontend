"use client";

import { isAxiosError } from "axios";
import { create } from "zustand";

import { playlistApi } from "../api/playlist.api";

import type { Playlist } from "./types";

interface PlaylistErrorData {
  message?: string;
  messages?: string;
}

interface PlaylistStore {
  playlists: Playlist[];
  isLoading: boolean;
  error: string | null;
  loadPlaylists: () => Promise<void>;
  addPlaylist: (playlist: Playlist) => void;
  removePlaylist: (playlistId: number) => void;
  clearPlaylists: () => void;
}

let latestLoadRequest = 0;

function getLoadError(error: unknown): string {
  if (!isAxiosError<PlaylistErrorData>(error)) {
    return "Не удалось загрузить плейлисты";
  }

  return (
    error.response?.data?.messages ??
    error.response?.data?.message ??
    "Не удалось загрузить плейлисты"
  );
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlists: [],
  isLoading: false,
  error: null,

  loadPlaylists: async () => {
    const requestId = ++latestLoadRequest;

    set({ isLoading: true, error: null });

    try {
      const playlists = await playlistApi.getUserPlaylists();
      if (requestId === latestLoadRequest) {
        set({ playlists });
      }
    } catch (error: unknown) {
      if (requestId === latestLoadRequest) {
        set({ error: getLoadError(error) });
      }
    } finally {
      if (requestId === latestLoadRequest) {
        set({ isLoading: false });
      }
    }
  },

  addPlaylist: (playlist) =>
    set((state) => ({ playlists: [...state.playlists, playlist] })),

  removePlaylist: (playlistId) =>
    set((state) => ({
      playlists: state.playlists.filter(
        (playlist) => playlist.id !== playlistId,
      ),
    })),

  clearPlaylists: () => {
    latestLoadRequest += 1;
    set({ playlists: [], isLoading: false, error: null });
  },
}));
