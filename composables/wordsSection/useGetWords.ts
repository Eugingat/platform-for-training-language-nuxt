import {useFetch} from "#app";

export const useGetWords = async (): Promise<any> => {
    const router = useRouter();

    const { data,error } = await useFetch('/api/wordsSection/word');

    if (unref(error)?.statusCode === 403) {
        await router.replace('/admin?code=403');
    }

    return data;
}