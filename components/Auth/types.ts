export type AuthTab = "login" | "register" | "resetPassword";

export interface InputConfig {
    name: string;
    placeholder: string;
    type: string;
}

export interface SocialNetwork {
    name: string;
    path: string;
}