export interface Playlist {
  id: number;
  name: string;
  coverUrl?: string;
  trackCount?: number;
}

export interface CreatePlaylistPayload {
  name: string;
}
