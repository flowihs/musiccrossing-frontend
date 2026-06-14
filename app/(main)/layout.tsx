import "./globals.css";
import "./layout.css";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import {AddPlaylistModal} from "@/components/playlist/AddPlaylistModal";

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
    <div className="main-shell">
      <Header />
      <div className="container-main">
        <Sidebar />
        <div className="RootLayout">
          <main className="content">{children}</main>
        </div>
      </div>

      <AddPlaylistModal />
    </div>
  );
}
