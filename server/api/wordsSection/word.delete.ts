import {del} from "~/server/lib/firestore";
import checkAuthUtils, {IErrorAuth} from "~/server/utils/checkAuth-utils";
import {QueryObject} from "ufo";

export default defineEventHandler(async (event) => {
    const isAuth: IErrorAuth | boolean = await checkAuthUtils(event);

    if (typeof(isAuth) !== 'boolean') {
        throw createError(isAuth);
    }

    try {
        const query = getQuery(event);

        if (query && query.id && typeof query.id === 'string') {
            await del('section-word', query.id);

            return true;
        }

        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
})