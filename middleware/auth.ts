import {navigateTo, useCookie, useFetch} from "#app";
import {unref} from "#imports";
// @ts-ignore
import jwt from "jsonwebtoken";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token');

    if (!unref(token)) {
        return navigateTo('/', { redirectCode: 403 });
    }
})