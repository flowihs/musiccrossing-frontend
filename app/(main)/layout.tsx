import "./globals.css";
import Header from "@/components/header/Header";

export const metadata = {
    title: "MusicShare",
    description: "Музыкальная платформа",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="RootLayout">
                <main className="content">{children}</main>
            </div>
        </>
    );
}
