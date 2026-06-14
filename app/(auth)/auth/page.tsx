import AuthPageClient from "./page-client";

export const metadata = {
    title: "Авторизация | MusicShare",
    description: "Войдите в аккаунт или зарегистрируйтесь",
};

export default function AuthPage() {
    return (
        <main className="authPage">
            <AuthPageClient />
        </main>
    );
}
