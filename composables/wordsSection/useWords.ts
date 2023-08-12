import {useFetch} from "#app";

export interface IWord {
    id: string;
    word: string;
    translation: { value: string}[];
    category: string;
}

export const useWords = () => {
    const router = useRouter();
    const createNewWord = async (newWord: Omit<IWord, 'id'>): Promise<boolean> => {

        const { data,error } = await useFetch('/api/wordsSection/word', {
            method: 'POST',
            body: newWord
        });

        if (unref(error)?.statusCode === 403) {
            await router.replace('/admin?code=403')
        }

        return !!data.value;
    }

    const getWords = async (): Promise<any> => {

        const { data,error } = await useFetch('/api/wordsSection/word');

        if (unref(error)?.statusCode === 403) {
            await router.replace('/admin?code=403');
        }

        return data;
    }

    const deleteWord = async (id: string): Promise<boolean> => {
        const { data,error } = await useFetch('/api/wordsSection/word', {
            method: 'DELETE',
            query: {
                id
            }
        });

        if (unref(error)?.statusCode === 403) {
            await router.replace('/admin?code=403');
        }

        return !!data.value;
    }

    return {
        createNewWord,
        getWords,
        deleteWord,
    }
}