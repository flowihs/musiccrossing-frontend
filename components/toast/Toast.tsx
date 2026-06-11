import styles from "./toast.module.css";
import {JSX, useState, useEffect} from "react";

interface ToastProps {
    title: string;
    message: string;
    error: boolean;
    onClose: () => void;
}

export function Toast({ title, message, error, onClose }: ToastProps): JSX.Element {
    const variantClass = error ? styles.modalError : styles.modalSuccess;
    const iconClass = error ? styles.iconContainerError : styles.iconContainerSuccess;
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsClosing(true);

            setTimeout(() => {
                onClose();
            }, 300)
        }, 5000)

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClick = () => {
        setIsClosing(true);
        setTimeout(() => onClose(), 300);
    };

    return (
        <div className={`${styles.modal} ${variantClass} ${isClosing ? styles.closing : ""}`} onClick={handleClick}>
            <div className={`${styles.iconContainer} ${iconClass}`} aria-hidden="true">
                {error ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="rgba(255,255,255,0.06)"/>
                        <path d="M12 7v6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 17h.01" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" fill="rgba(255,255,255,0.06)"/>
                        <path d="M9 12.5l1.8 1.8L15 10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
            </div>

            <div className={styles.textContainer}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{message}</p>
            </div>
        </div>
    );
}
