import { api } from "@/lib/axios";

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  settings?: unknown;
}

export const userServices = {
  getMyProfile: async () => {
    const { data } = await api.get<UserProfile>("/user/my-profile");
    return data;
  },
  logout: async () => {
    return await api.post("/auth/logout");
  }
};
