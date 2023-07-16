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

export const useAuthUsers = async (login: string, password: string): Promise<any> => {
    const { data: isAuth } = await useFetch('/api/auth-user', {
        query: {
            login,
            password,
        }
    });

    if (unref(isAuth)) return isAuth;

    return false;
}

export const useRegister = async (login: string, password: string): Promise<boolean> => {
    const {data: isRegistered} = await useFetch('/api/register', {
        method: 'POST',
        body: {
            login,
            password,
        }
    })

    if (unref(isRegistered)) return true;

    return false;
}