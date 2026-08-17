"use client";

import { isAxiosError } from "axios";
import { useCallback, useState } from "react";

import { playlistApi, usePlaylistStore } from "@/entities/playlist";

interface CreatePlaylistErrorData {
  message?: string;
  messages?: string;
}

function getCreateError(error: unknown): string {
  if (!isAxiosError<CreatePlaylistErrorData>(error)) {
    return "Не удалось создать плейлист";
  }

  return (
    error.response?.data?.messages ??
    error.response?.data?.message ??
    "Не удалось создать плейлист"
  );
}

export function useCreatePlaylist() {
  const addPlaylist = usePlaylistStore((state) => state.addPlaylist);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPlaylist = useCallback(
    async (name: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const playlist = await playlistApi.createPlaylist({ name });
        addPlaylist(playlist);
        return playlist;
      } catch (requestError: unknown) {
        setError(getCreateError(requestError));
        throw requestError;
      } finally {
        setIsLoading(false);
      }
    },
    [addPlaylist],
  );

  return {
    createPlaylist,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
