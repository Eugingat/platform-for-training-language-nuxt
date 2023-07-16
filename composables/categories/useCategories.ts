import {useFetch} from "#app";

export const useGetCategories = async (): Promise<any> => {
    const { data } = await useFetch('/api/wordsSection/categories');

    return data;
}

export const useCreateCategories = async (name: string): Promise<any> => {
    const {data} = await useFetch('/api/wordsSection/categories', {
        method: 'POST',
        body: name
    })

    return data;
}