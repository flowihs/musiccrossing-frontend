import type { Track } from "@/entities/track";

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Ночной город",
    artist: "Music Crossing",
    coverUrl: "/sound/poster.png",
  },
  {
    id: 2,
    title: "Тёплый ветер",
    artist: "Music Crossing",
    coverUrl: "/sound/poster.png",
  },
  {
    id: 3,
    title: "За горизонтом",
    artist: "Music Crossing",
    coverUrl: "/sound/poster.png",
  },
  {
    id: 4,
    title: "Новый ритм",
    artist: "Music Crossing",
    coverUrl: "/sound/poster.png",
  },
  {
    id: 5,
    title: "Без остановок",
    artist: "Music Crossing",
    coverUrl: "/sound/poster.png",
  },
  {
    id: 6,
    title: "Тихий свет",
    artist: "Music Crossing",
    coverUrl: "/sound/poster.png",
  },
  {
    id: 7,
    title: "На повторе",
    artist: "Music Crossing",
    coverUrl: "/sound/poster.png",
  },
  {
    id: 8,
    title: "В одном темпе",
    artist: "Music Crossing",
    coverUrl: "/sound/poster.png",
  },
];

export const HOME_TRACK_SECTIONS = [
  { title: "Популярное сейчас", tracks: TRACKS },
  { title: "Для концентрации", tracks: TRACKS.slice(2) },
  { title: "Недавно добавленные", tracks: [...TRACKS].reverse() },
];
