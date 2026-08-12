
import { useUserStore } from '@/entities/user';
import { userServices } from '@/entities/user/api/UserService';
import { ErrorResponse } from "@/shared/error";
import { useState, useCallback } from 'react';
import { isAxiosError } from "axios"; 

export function useLogout() {

    const clearUser = useUserStore((state) => state.clearUser);
    const [error, setError] = useState<ErrorResponse>();
    const [isLoading, setIsLoading] = useState<boolean>();

    const logout = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await userServices.logout();
            if (res.status === 200) {
                clearUser();
                return;
            }
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.request) {
                    setError(error.response?.data);
                    console.error(JSON.stringify(error, null, 2));
                } else {
                console.error('Error: ', JSON.stringify(error, null, 2));
            }
            } else {
                console.error('Something went wrong', error);
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [clearUser]);

    return { logout, isLoading, error } 
}