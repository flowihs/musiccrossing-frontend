import { api } from "@/shared/api";

import type { CreatePlaylistPayload, Playlist } from "../model/types";

export const playlistApi = {
  async getUserPlaylists(): Promise<Playlist[]> {
    const response = await api.get<Playlist[]>("/playlists/getByUser");
    return response.data;
  },

  async createPlaylist(payload: CreatePlaylistPayload): Promise<Playlist> {
    const response = await api.post<Playlist>("/playlists/create", payload);
    return response.data;
  },
};
