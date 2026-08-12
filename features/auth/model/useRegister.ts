
import { useUserStore } from '@/entities/user';
import { userServices } from '@/entities/user/api/UserService';
import { ErrorResponse } from "@/shared/error";
import { useState, useCallback } from 'react';
import { isAxiosError } from "axios";
import type { RegisterSchema, User } from '@/entities/user';
import errorEntry from 'next/dist/server/typescript/rules/error';

export function useRegiser() {

    const setUser = useUserStore((state) => state.setUser);
    const [error, setError] = useState<ErrorResponse>();
    const [isLoading, setIsLoading] = useState<boolean>();

    const register = useCallback(async (credentials: RegisterSchema) => {
        try {
            const res = await userServices.register(credentials);
            if (res.status === 200) {
                setUser({ 
                    ...credentials,
                    id: '0',
                    role: 'none',
                    settings: {
                        id: 'none'
                    } 
                });
                return;
            }
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.request) {
                    setError(error.response?.data);
                    console.error(JSON.stringify(error, null, 2));
                } else {
                console.error('Error: \n', JSON.stringify(error, null, 2));
            }
            } else {
                console.error('Something went wrong', error);
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [setUser]);

    return { register, isLoading, error };
}