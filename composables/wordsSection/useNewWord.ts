import {useFetch} from "#app";

interface INewWord {
    word: string;
    translation: string[];
    category: string;
}

export const useNewWord = async (newWord:INewWord): Promise<boolean> => {
    const router = useRouter();

    const { data,error } = await useFetch('/api/wordsSection/word', {
        method: 'POST',
        body: newWord
    });

    if (unref(error)?.statusCode === 403) {
        await router.replace('/admin?code=403')
    }

    if (data.value) {
        return false
    }

    return true;

}