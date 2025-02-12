import {firebase} from '../firebase';
import { addDoc, collection, query, where, getDocs, orderBy, limit, deleteDoc } from 'firebase/firestore';

export const addData = async (data, collectionName) => {
    const ref = collection(firebase, collectionName);
    const fieldName = data.id ? "id" : "title";
    const fieldValue = data.name || data.title;
    const q = query(ref, where(fieldName, "==", fieldValue));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return { error: `Document with the same ${fieldName} already exists.` };
    }

    // Get the last document to determine the next id
    const lastDocQuery = query(ref, orderBy('id', 'desc'), limit(1));
    const lastDocSnapshot = await getDocs(lastDocQuery);
    let newId = 1;
    if (!lastDocSnapshot.empty) {
        const lastDoc = lastDocSnapshot.docs[0];
        newId = lastDoc.data().id + 1;
    }

    try {
        const docRef = await addDoc(ref, { ...data, id: newId });
        console.log("Document written with ID: ", docRef.id);
        return { success: true, id: newId };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { error: "Error adding document." };
    }
}

export const getData = async (collectionName) => {
    const ref = collection(firebase, collectionName);
    try {
        const querySnapshot = await getDocs(ref);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { success: true, data };
    } catch (e) {
        console.error("Error fetching documents: ", e);
        return { error: "Error fetching documents." };
    }
}

export const getAttributesbyCategory = async (categoryId) => {
    const ref = collection(firebase, 'attributes');
    const q = query(ref, where("categoryId", "==", categoryId));
    try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { success: true, data };
    } catch (e) {
        console.error("Error fetching documents: ", e);
        return { error: "Error fetching documents." };
    }
}

export const deleteProductbyId = async (productId) => {
    const ref = collection(firebase, 'products');
    const q = query(ref, where("id", "==", productId));
    
    try {
        // First get the document reference
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return { success: false, error: "Document not found" };
        }

        // Get the first matching document (assuming 'id' is unique)
        const docRef = querySnapshot.docs[0].ref;
        
        // Delete the document
        await deleteDoc(docRef);
        
        console.log("Document deleted successfully");
        return { success: true, productId };
        
    } catch (error) {
        console.error("Error deleting document: ", error);
        return { success: false, error: error.message };
    }
}