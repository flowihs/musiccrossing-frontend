export interface Playlist {
  id: number;
  name: string;
  trackCount?: number;
}

export interface CreatePlaylistPayload {
  name: string;
}
