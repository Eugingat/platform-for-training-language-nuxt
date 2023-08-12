import {useFetch} from "#app";

export const useCategories = () => {
    const router = useRouter();
    const getCategories = async (): Promise<any> => {
        const {data, error} = await useFetch('/api/wordsSection/categories');

        if (unref(error)?.statusCode === 403) {
            await router.replace('/admin?code=403')
        }

        return data;
    }

    const createCategories = async (name: string): Promise<any> => {
        const {data,error} = await useFetch('/api/wordsSection/categories', {
            method: 'POST',
            body: name
        })

        if (unref(error)?.statusCode === 403) {
            await router.replace('/admin?code=403')
        }

        return data;
    }

    return {
        getCategories,
        createCategories,
    }
};