import {set} from "~/server/lib/firestore";

interface INewWord {
    word: string;
    translate: string[];
    category: string;
}

export default defineEventHandler(async (event) => {
    const body: INewWord = await readBody(event);

    try {
        if (body.word && body.category) {
            await set('section-word', body);

            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
})