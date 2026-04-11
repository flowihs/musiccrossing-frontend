import styles from "./auth.module.css";
import { AuthTab } from "./types";
import { FORM_CONFIG, BUTTON_TEXTS } from "./constants";

interface AuthFormProps {
    activeTab: AuthTab;
}

export function AuthForm({ activeTab }: AuthFormProps) {
    const inputs = FORM_CONFIG[activeTab];
    const buttonText = BUTTON_TEXTS[activeTab];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formElement}>
            <div className={styles.formWrapper}>
                {
                    inputs.map((field) => (
                        <input
                            key={field.name}
                            name={field.name}
                            className={styles.inputField}
                            placeholder={field.placeholder}
                            type={field.type}
                            required
                        />
                    ))
                }
            </div>

            <button type="submit" className={styles.submitBtn}>
                {buttonText}
            </button>
        </form>
    );
}