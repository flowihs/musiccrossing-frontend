import styles from "./auth.module.css";
import { SOCIAL_NETWORKS } from "./constants";

export function SocialLogin() {
    return (
        <div className={styles.socialWrapper}>
            {
                SOCIAL_NETWORKS.map((network) => (
                <div
                    key={network.name}
                    className={styles.socialIcon}
                    title={`Войти через ${network.name}`}
                />
                ))
            }
        </div>
    );
}