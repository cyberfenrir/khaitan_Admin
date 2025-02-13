import {firebase} from '../firebase';
import { addDoc, collection, getDocs, query, where, orderBy, limit, deleteDoc, doc, getDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

export const bulkAddData = async (dataArray, collectionName) => {
    const ref = collection(firebase, collectionName);
    
    // Get the last document to determine the next id
    const lastDocQuery = query(ref, orderBy('id', 'desc'), limit(1));
    const lastDocSnapshot = await getDocs(lastDocQuery);
    let nextId = 1;
    if (!lastDocSnapshot.empty) {
        const lastDoc = lastDocSnapshot.docs[0];
        nextId = lastDoc.data().id + 1;
    }

    try {
        // Create a batch
        const batch = writeBatch(firebase);
        
        // Add each document to the batch with an incrementing ID
        dataArray.forEach((data, index) => {
            const newDocRef = doc(ref);
            batch.set(newDocRef, { 
                ...data, 
                id: nextId + index 
            });
        });

        // Commit the batch
        await batch.commit();
        
        return { 
            success: true, 
            startId: nextId, 
            endId: nextId + dataArray.length - 1 
        };
    } catch (e) {
        console.error("Error adding documents: ", e);
        return { error: "Error adding documents." };
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


export const uploadImageToStorage = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };
  
  // Function to add media data to Firestore
  export const addMedia = async (mediaData) => {
    const ref = collection(firebase, 'media');
    try {
      const docRef = await addDoc(ref, mediaData);
      console.log("Media document written with ID: ", docRef.id);
      return { success: true, id: docRef.id };
    } catch (e) {
      console.error("Error adding media document: ", e);
      return { error: "Error adding media document." };
    }
  };

  export const getProductById = async (productId) => {
    const ref = collection(firebase, 'products');
    const q = query(ref, where("id", "==", productId));
    
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return { success: false, error: "Product not found" };
      }
      const product = querySnapshot.docs[0].data();
      return { success: true, data: product };
    } catch (error) {
      console.error("Error fetching product: ", error);
      return { success: false, error: error.message };
    }
  };
  
  
  export const getAllMedia = async () => {
    const ref = collection(firebase, 'media');
    try {
      const querySnapshot = await getDocs(ref);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { success: true, data };
    } catch (e) {
      console.error("Error fetching media documents: ", e);
      return { error: "Error fetching media documents." };
    }
  };

  export const updateProduct = async (productId, productData) => {
    const ref = collection(firebase, 'products');
    const q = query(ref, where("id", "==", productId));
    
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return { success: false, error: "Product not found" };
      }
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, productData);
      return { success: true };
    } catch (error) {
      console.error("Error updating product: ", error);
      return { success: false, error: error.message };
    }
  };
  
  export const updateAttributes = async (attributeId, attributeData) => {
    const ref = doc(firebase, 'attributes', attributeId);
    try {
      await updateDoc(ref, attributeData);
      return { success: true };
    } catch (error) {
      console.error("Error updating attribute: ", error);
      return { success: false, error: error.message };
    }
  };


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

//attributes

export const createAttribute = async (attributeData) => {
    const ref = collection(firebase, 'attributes');
    try {
        const docRef = await addDoc(ref, attributeData);
        console.log("Attribute created with ID: ", docRef.id);
        return { 
            success: true, 
            message: 'Attribute created successfully',
            data: { id: docRef.id }
        };
    } catch (error) {
        console.error("Error creating attribute: ", error);
        return { 
            success: false, 
            message: 'Error creating attribute',
            error: error.message 
        };
    }
}

export const getAllAttributes = async () => {
    try {
        const snapshot = await getData('attributes');
        return snapshot;
    } catch (error) {
        console.error("Error fetching attributes: ", error);
        return { 
            success: false, 
            message: 'Error fetching attributes',
            error: error.message 
        };
    }
}

export const getAttribute = async (attributeId) => {
    try {
        const docRef = doc(firebase, 'attributes', attributeId);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            return { 
                success: false, 
                message: 'Attribute not found' 
            };
        }

        return { 
            success: true, 
            data: { id: docSnap.id, ...docSnap.data() }
        };
    } catch (error) {
        console.error("Error fetching attribute: ", error);
        return { 
            success: false, 
            message: 'Error fetching attribute',
            error: error.message 
        };
    }
}

export const updateAttribute = async (attributeId, attributeData) => {
    try {
        const docRef = doc(firebase, 'attributes', attributeId);
        await updateDoc(docRef, attributeData);
        return { 
            success: true, 
            message: 'Attribute updated successfully' 
        };
    } catch (error) {
        console.error("Error updating attribute: ", error);
        return { 
            success: false, 
            message: 'Error updating attribute',
            error: error.message 
        };
    }
}

export const deleteAttribute = async (attributeId) => {
    try {
        const docRef = doc(firebase, 'attributes', attributeId);
        await deleteDoc(docRef);
        return { 
            success: true, 
            message: 'Attribute deleted successfully' 
        };
    } catch (error) {
        console.error("Error deleting attribute: ", error);
        return { 
            success: false, 
            message: 'Error deleting attribute',
            error: error.message 
        };
    }
}

export const fetchCategoryById = async (categoryId) => {
    const ref = collection(firebase, 'categories');
    const q = query(ref, where("id", "==", categoryId));
    
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return { success: false, error: "Category not found" };
      }
      const category = querySnapshot.docs[0].data();
      return { success: true, data: category };
    } catch (error) {
      console.error("Error fetching category: ", error);
      return { success: false, error: error.message };
    }
  };

  export const getAllCategories = async () => {
    const ref = collection(firebase, 'categories');
    try {
      const querySnapshot = await getDocs(ref);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { success: true, data };
    } catch (e) {
      console.error("Error fetching categories: ", e);
      return { error: "Error fetching categories." };
    }
  };