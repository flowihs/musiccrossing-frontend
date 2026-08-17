import type { AuthTab, InputConfig } from "./types";

const LOGIN_FIELDS: InputConfig[] = [
  { name: "login", placeholder: "Логин или email", type: "text" },
  { name: "password", placeholder: "Пароль", type: "password" },
];

const REGISTER_FIELDS: InputConfig[] = [
  { name: "username", placeholder: "Имя пользователя", type: "text" },
  { name: "email", placeholder: "Email", type: "email" },
  { name: "password", placeholder: "Пароль", type: "password" },
  {
    name: "confirmPassword",
    placeholder: "Подтвердите пароль",
    type: "password",
  },
];

const RESET_PASSWORD_FIELDS: InputConfig[] = [
  { name: "email", placeholder: "Ваш Email", type: "email" },
];

export function getFormConfig(tab: AuthTab): InputConfig[] {
  switch (tab) {
    case "login":
      return LOGIN_FIELDS;
    case "register":
      return REGISTER_FIELDS;
    case "resetPassword":
      return RESET_PASSWORD_FIELDS;
  }
}

export function getButtonText(tab: AuthTab): string {
  switch (tab) {
    case "login":
      return "Войти";
    case "register":
      return "Зарегистрироваться";
    case "resetPassword":
      return "Восстановить пароль";
  }
}
