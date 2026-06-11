"use client";

import {useToastStore} from "@/store/toastStore";
import {Toast} from "./Toast";
import {ToastPortal} from "./ToastPortal";
import styles from "./toast.module.css";

export function ToastStack() {
    const toasts = useToastStore((state) => state.toasts);
    const removeToast = useToastStore((state) => state.removeToast);

    return (
        <ToastPortal>
            <div className={styles.toastStack}>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        title={toast.title}
                        message={toast.message}
                        error={toast.type === "error"}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastPortal>
    );
}
