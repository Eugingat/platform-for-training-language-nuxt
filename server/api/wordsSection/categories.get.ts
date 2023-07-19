import {queryByCollection} from "~/server/lib/firestore";
import checkAuthUtils, {IErrorAuth} from "~/server/utils/checkAuth-utils";

export default defineEventHandler(async (event) => {
    const isAuth: IErrorAuth | boolean = await checkAuthUtils(event);

    if (typeof(isAuth) !== 'boolean') {
        throw createError(isAuth);
    }

    const docs = await queryByCollection('categories');

    return docs;
})