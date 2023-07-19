import {queryByCollection, set, updateCategories} from "~/server/lib/firestore";
import checkAuthUtils, {IErrorAuth} from "~/server/utils/checkAuth-utils";

interface INewCategory {
    name: string;
}

export default defineEventHandler(async (event) => {
    const isAuth: IErrorAuth | boolean = await checkAuthUtils(event);

    if (typeof(isAuth) !== 'boolean') {
        throw createError(isAuth);
    }

    const [docs]: any[] = await queryByCollection('categories');
    const name: INewCategory = await readBody(event);

    try {
        if (name) {
            docs.list.push(name);

            await updateCategories('categories', docs);

            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
    return false;
})