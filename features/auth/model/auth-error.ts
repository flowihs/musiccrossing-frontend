import { isAxiosError } from "axios";

export interface AuthError {
  title: string;
  message: string;
}

interface ApiErrorData {
  error?: string;
  message?: string;
  messages?: string | string[];
}

export function getAuthError(
  error: unknown,
  fallbackMessage: string,
): AuthError {
  if (!isAxiosError<ApiErrorData>(error)) {
    return { title: "Ошибка", message: fallbackMessage };
  }

  const data = error.response?.data;
  const messages = Array.isArray(data?.messages)
    ? data.messages.join(". ")
    : data?.messages;

  return {
    title: data?.error ?? "Ошибка",
    message: messages ?? data?.message ?? fallbackMessage,
  };
}
