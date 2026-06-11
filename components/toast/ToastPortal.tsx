"use client";

import {createPortal} from "react-dom";
import type {ReactNode} from "react";
import { useEffect, useState } from "react";

interface ToastPortalProps {
    children: ReactNode;
}

export function ToastPortal({ children }: ToastPortalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    if (typeof window === "undefined") return null;

    return createPortal(children, document.body);
}