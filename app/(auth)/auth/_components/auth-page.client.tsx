"use client";

import { useSearchParams } from "next/navigation";

import { AuthCard } from "@/features/auth";

import type { AuthTab } from "@/features/auth";

export function AuthPageClient() {
  const searchParams = useSearchParams();
  const initialTab: AuthTab =
    searchParams.get("tab") === "register" ? "register" : "login";

  return <AuthCard initialTab={initialTab} />;
}
