import {navigateTo, useCookie} from "#app";
import {unref} from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token');

    if (!unref(token)) {
        const rootPath = to.path.includes('/admin') ? 'admin' : '';

        return navigateTo(`/${rootPath}?code=403`, { redirectCode: 403 });
    }
})