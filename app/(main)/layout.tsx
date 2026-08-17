import "./globals.css";

import { PlaylistProvider } from "@/app/_providers/playlist-provider.client";
import { CreatePlaylistModal } from "@/features/create-playlist";
import { Header } from "@/widgets/header";
import { MainShell } from "@/widgets/main-shell";
import { Sidebar } from "@/widgets/sidebar";

export const metadata = {
  title: "MusicShare",
  description: "Музыкальная платформа",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlaylistProvider>
      <MainShell
        header={<Header />}
        sidebar={<Sidebar />}
        modal={<CreatePlaylistModal />}
      >
        {children}
      </MainShell>
    </PlaylistProvider>
  );
}
