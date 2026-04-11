import { AuthTab, InputConfig, SocialNetwork } from "./types";

export const SOCIAL_NETWORKS: SocialNetwork[] = [
    { name: "VK", path: "/Auth/vk" },
    { name: "Discord", path: "/Auth/discord" }
];

export const BUTTON_TEXTS: Record<AuthTab, string> = {
    login: "Войти",
    register: "Зарегистрироваться",
    resetPassword: "Восстановить пароль"
};

export const FORM_CONFIG: Record<AuthTab, InputConfig[]> = {
    login: [
        { name: "identifier", placeholder: "Логин или email", type: "text" },
        { name: "password", placeholder: "Пароль", type: "password" }
    ],
    register: [
        { name: "username", placeholder: "Имя пользователя", type: "text" },
        { name: "email", placeholder: "Email", type: "email" },
        { name: "password", placeholder: "Пароль", type: "password" },
        { name: "confirmPassword", placeholder: "Подтвердите пароль", type: "password" }
    ],
    resetPassword: [
        { name: "email", placeholder: "Ваш Email", type: "email" }
    ]
};