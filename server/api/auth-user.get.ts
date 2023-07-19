import {queryByCollection, updateUser} from "~/server/lib/firestore";
// @ts-ignore
import jwt from "jsonwebtoken";
import {IUsers} from "~/server/api/auth.get";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const docs: IUsers[] | any = await queryByCollection('users');

    const user = docs.find((doc: IUsers) => {
        if (query.login === doc.login && doc.password === query.password) {
            return doc;
        }
    })

    if (user) {
        try {
            const token = await jwt.sign({login: user.login}, process.env.SECRET_KEY, { expiresIn: '24h' });

            user.token = token;

            await updateUser('users', user);

            return user;
        } catch (e) {
            console.log(e);
        }
    }

    return false;
})