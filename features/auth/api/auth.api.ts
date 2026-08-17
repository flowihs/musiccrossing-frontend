import { api } from "@/shared/api";

import type {
  AuthResponse,
  LoginScheme,
  RegisterSchema,
} from "@/entities/user";

export const authApi = {
  async login(credentials: LoginScheme): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  async register(credentials: RegisterSchema): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/auth/register",
      credentials,
    );
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  async loginWithGoogle(idToken: string): Promise<void> {
    await api.post("/auth/google", { idToken });
  },

  async requestPasswordReset(email: string): Promise<void> {
    await api.post("/user/forgot-password", { email });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post(`/user/reset-password?token=${encodeURIComponent(token)}`, {
      newPassword,
    });
  },
};
