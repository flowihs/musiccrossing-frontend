import { Suspense } from "react";

import { AuthPageClient } from "./_components/auth-page.client";

export const metadata = {
  title: "Авторизация | MusicShare",
  description: "Войдите в аккаунт или зарегистрируйтесь",
};

export default function AuthPage() {
  return (
    <main className="authPage">
      <Suspense fallback={null}>
        <AuthPageClient />
      </Suspense>
    </main>
  );
}
