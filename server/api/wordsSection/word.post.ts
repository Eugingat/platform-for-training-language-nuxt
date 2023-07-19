import {set} from "~/server/lib/firestore";
import checkAuthUtils, {IErrorAuth} from "~/server/utils/checkAuth-utils";

interface INewWord {
    word: string;
    translate: string[];
    category: string;
}

export default defineEventHandler(async (event) => {
    const isAuth: IErrorAuth | boolean = await checkAuthUtils(event);

    if (typeof(isAuth) !== 'boolean') {
        throw createError(isAuth);
    }

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