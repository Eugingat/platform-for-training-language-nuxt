import {useFetch} from "#app";

interface INewWord {
    word: string;
    translation: string[];
    category: string;
}

export const useNewWord = async (newWord:INewWord): Promise<boolean> => {
    const { error } = await useFetch('/api/wordsSection/word', {
        method: 'POST',
        body: newWord
    });

    if (error.value) {
        return false
    }

    return true;

}