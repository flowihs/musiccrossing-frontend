
import type { Settings } from '@/entities/settings';

export interface User {
    id: string,
    username: string,
    email: string,
    role: string,
    settings: Settings
}

export interface LoginScheme {
    login: string,
    password: string
}

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
}

export interface RegisterSchema {
  email: string,
  username: string,
  password: string
}