"use client";

import { useEffect } from "react";

import { usePlaylistStore } from "@/entities/playlist";
import { useUserStore } from "@/entities/user";

interface PlaylistProviderProps {
  children: React.ReactNode;
}

export function PlaylistProvider({ children }: PlaylistProviderProps) {
  const userId = useUserStore((state) => state.user?.id);
  const loadPlaylists = usePlaylistStore((state) => state.loadPlaylists);
  const clearPlaylists = usePlaylistStore((state) => state.clearPlaylists);

  useEffect(() => {
    clearPlaylists();

    if (userId) {
      void loadPlaylists();
    }

    return clearPlaylists;
  }, [clearPlaylists, loadPlaylists, userId]);

  return children;
}
