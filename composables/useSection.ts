import {useFetch} from "#app";

export const useSections = async (): Promise<any> => {
    const { data } = await useFetch('/api/sections');

    return data;
}