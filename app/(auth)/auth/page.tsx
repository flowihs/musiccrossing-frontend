import {AuthCard} from "@/components/auth/AuthCard";

export const metadata = {
    title: "Авторизация | MusicShare",
    description: "Войдите в аккаунт или зарегистрируйтесь",
};

export default function AuthPage() {
    return (
        <main style={{minHeight: "100vh", position: "relative", backgroundColor: "#f9f9f9"}}>
            <AuthCard/>
        </main>
    );
}