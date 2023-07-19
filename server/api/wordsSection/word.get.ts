import {queryByCollection, set} from "~/server/lib/firestore";
import checkAuthUtils, {IErrorAuth} from "~/server/utils/checkAuth-utils";

export default defineEventHandler(async (event) => {
    const isAuth: IErrorAuth | boolean = await checkAuthUtils(event);

    if (typeof(isAuth) !== 'boolean') {
        throw createError(isAuth);
    }

    try {
        const docs = await queryByCollection('section-word');

        return docs;
    } catch (e) {
        console.log(e);
        return false;
    }
})