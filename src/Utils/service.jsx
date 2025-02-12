import {firebase} from '../firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';

export const addData = async (data, collectionName) => {
    const ref = collection(firebase, collectionName);
    const q = query(ref, where("name", "==", data.name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return { error: "Document with the same name already exists." };
    }

    try {
        const docRef = await addDoc(ref, { ...data, id: ref.id });
        console.log("Document written with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { error: "Error adding document." };
    }
}