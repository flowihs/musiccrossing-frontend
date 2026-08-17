import { Suspense } from "react";

import { ResetPasswordForm } from "@/features/auth";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Загрузка...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
