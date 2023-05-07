import {useFetch} from "#app";

export const useCategories = async (): Promise<any> => {
    const { data } = await useFetch('/api/wordsSection/categories');

    return data;
}