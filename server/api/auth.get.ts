import {queryByCollection} from "~/server/lib/firestore";
// @ts-ignore
import jwt from "jsonwebtoken";

interface IUsers {
  login: string;
  password: string;
  token: string;
  id: string;
};

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const docs: IUsers[] | any = await queryByCollection('users');

    const user = docs.find((doc: IUsers) => {
        if (query.login === doc.login && doc.password === query.password) {
            return doc;
        }
    })

    if (user) {
        const isToken = await jwt.verify(user.token, process.env.SECRET_KEY);

        if (isToken) {
            return user.token;
        }
    }

    return false;
})