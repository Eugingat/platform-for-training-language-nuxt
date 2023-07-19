import {useFetch} from "#app";

export const useGetCategories = async (): Promise<any> => {
    const router = useRouter();

    const {data, error} = await useFetch('/api/wordsSection/categories');

    if (unref(error)?.statusCode === 403) {
        await router.replace('/admin?code=403')
    }

    return data;
}

export const useCreateCategories = async (name: string): Promise<any> => {
    const router = useRouter();

    const {data,error} = await useFetch('/api/wordsSection/categories', {
        method: 'POST',
        body: name
    })

    if (unref(error)?.statusCode === 403) {
        await router.replace('/admin?code=403')
    }

    return data;
}