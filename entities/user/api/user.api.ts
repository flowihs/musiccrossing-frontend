import { api } from "@/shared/api";

import type { User } from "../model/types";

export const userApi = {
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/user/my-profile");

    return response.data;
  },
};
