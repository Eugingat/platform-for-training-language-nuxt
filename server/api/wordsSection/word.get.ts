import {queryByCollection, set} from "~/server/lib/firestore";

export default defineEventHandler(async () => {
    try {
        const docs = await queryByCollection('section-word');

        return docs;
    } catch (e) {
        console.log(e);
        return false;
    }
})