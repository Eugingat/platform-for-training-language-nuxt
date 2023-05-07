import {queryByCollection} from "~/server/lib/firestore";

export default defineEventHandler(async () => {
    const docs = await queryByCollection('categories');

    return docs;
})