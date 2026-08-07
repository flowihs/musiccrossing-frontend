import { AuthTab, InputConfig } from "./types";

export const BUTTON_TEXTS: Record<AuthTab, string> = {
  login: "Войти",
  register: "Зарегистрироваться",
  resetPassword: "Восстановить пароль",
};

export const FORM_CONFIG: Record<AuthTab, InputConfig[]> = {
  login: [
    { name: "login", placeholder: "Логин или email", type: "text" },
    { name: "password", placeholder: "Пароль", type: "password" },
  ],
  register: [
    { name: "username", placeholder: "Имя пользователя", type: "text" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "password", placeholder: "Пароль", type: "password" },
    {
      name: "confirmPassword",
      placeholder: "Подтвердите пароль",
      type: "password",
    },
  ],
  resetPassword: [{ name: "email", placeholder: "Ваш Email", type: "email" }],
};
