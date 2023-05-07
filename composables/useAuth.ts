import {useFetch} from "#app";
import {unref} from "#build/imports";

export const useAuth = async (login: string, password: string): Promise<any> => {
    const { data: isAuth } = await useFetch('/api/auth', {
        query: {
            login,
            password,
        }
    });

    if (unref(isAuth)) return isAuth;

    return false;
}