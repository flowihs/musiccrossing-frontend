"use client";

import { AuthCard } from "@/components/auth/AuthCard";
import { AuthTab } from "@/components/auth/types";
import { useSearchParams } from "next/navigation";

export default function AuthPageClient() {
    const searchParams = useSearchParams();
    const initialTab: AuthTab = searchParams.get("tab") === "register" ? "register" : "login";

    return <AuthCard initialTab={initialTab} />;
}
