import {useFetch} from "#app";

export const useSections = async (): Promise<any> => {
    const router = useRouter();

    const { data, error } = await useFetch('/api/sections');

    if (unref(error)?.statusCode === 403) {
        router.replace('/admin?code=403')
    }

    return data;
}