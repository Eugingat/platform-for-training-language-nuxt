import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    setDoc,
    collectionGroup,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { firestoreDb } from "./firebase";


export const queryByCollection = async (col: string) => {
    // @ts-ignore
    const colRef = collection(firestoreDb, col);

    const snapshot = await getDocs(colRef);

    const docs = Array.from(snapshot.docs).map((doc) => {
        return {
            ...doc.data(),
            id: doc.id,
        };
    });

    return docs;
};

export const set = async (col: string, document: Object) => {
    await setDoc(doc(collection(firestoreDb, col)), document, { merge: true });
};

export const updateCategories = async (col: string, document: any) => {
    const docs = doc(firestoreDb, col, document.id);

    await updateDoc(docs, {list: document.list})
}

export const updateUser= async (col: string, document: any) => {
    const docs = doc(firestoreDb, col, document.id);

    await updateDoc(docs, {token: document.token})
}

export const add = async (col: string, document: Object) => {
    // @ts-ignore
    const colRef = collection(firestoreDb, col);

    const docRef = await addDoc(colRef, document);

    return docRef;
};

export const del = async (col: string, id: string) => {
    const docRef = doc(firestoreDb, col, id);
    return await deleteDoc(docRef);
};