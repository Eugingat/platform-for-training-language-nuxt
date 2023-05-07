import {useFetch} from "#app";

export const useGetWords = async (): Promise<any> => {
    const { data } = await useFetch('/api/wordsSection/word');

    return data;
}