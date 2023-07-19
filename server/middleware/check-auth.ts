// @ts-ignore
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event);

    if (cookies.token) {
        try {
            await jwt.verify(cookies.token, process.env.SECRET_KEY);

            event.context.auth = true;
        } catch (e) {
            event.context.auth = false;
        }
    }
})