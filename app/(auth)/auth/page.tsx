import {AuthCard} from "@/components/auth/AuthCard";

export const metadata = {
    title: "Авторизация | MusicShare",
    description: "Войдите в аккаунт или зарегистрируйтесь",
};

export default function AuthPage() {
    return (
        <main className="authPage">
            <AuthCard/>
        </main>
    );
}
