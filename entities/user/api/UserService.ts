import { api } from "@/shared/api";

import type { User, LoginScheme, AuthResponse, RegisterSchema } from '@/entities/user';
import type { ErrorResponse } from '@/shared/error';

export const userServices = {
  getMyProfile: async () => {
    const res = await api.get<User>("/user/my-profile");
    return res;
  },
  login: async (credentials: LoginScheme) => {
    const res = await api.post<AuthResponse>("/auth/login", credentials);
    return res;
  },
  logout: async () => {
    const res = await api.post('/auth/login');
    return res; 
  },
  register: async (credentials: RegisterSchema) => {
    const res = await api.post<AuthResponse>('/auth/register', credentials);
    return res;
  }
};
