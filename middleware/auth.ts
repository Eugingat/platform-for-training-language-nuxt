import {navigateTo, useCookie} from "#app";
import {unref} from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token');

    if (!unref(token)) {
        return navigateTo('/admin?code=403', { redirectCode: 403 });
    }
})