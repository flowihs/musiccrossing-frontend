'use client';

import { userServices } from '@/entities/user/api/UserService';
import { ErrorResponse } from "@/shared/error";
import { useState, useCallback } from 'react';
import { isAxiosError } from "axios";
import type { LoginScheme } from '@/entities/user'; 


export function useLogin() {
    const [error, setError] = useState<ErrorResponse>();
    const [isLoading, setIsLoading] = useState(false);

    const login = useCallback(async (credentials: LoginScheme) => {
        try {
            const res = await userServices.login(credentials);
            console.log(res.data);
        } catch(error: unknown) {
            if (isAxiosError(error)) {
                if (error.request) {
                    setError(error.response?.data);
                    console.error(JSON.stringify(error, null, 2));
                } else {
                    console.error('Error: \n', JSON.stringify(error, null, 2));
                }
            } else {
                console.log('Something went wrong: ', error);
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [])


    return { login, isLoading, error };
}