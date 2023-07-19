import {add, queryByCollection} from "~/server/lib/firestore";
import {IUsers} from "~/server/api/auth.get";

interface INewUser {
    login: string;
    password: string;
}

export default defineEventHandler(async (event) => {
    const body: INewUser = await readBody(event);

    const docs: IUsers[] | any = await queryByCollection('users');

    const user = docs.find(({login}: IUsers) => login === body.login);

    if (user) return false;

    try {
        await add('users', { ...body, token: ''})

        return true;
    } catch (e) {
        console.log(e);
    }
    return false;
})