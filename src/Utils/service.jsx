import { firebase } from '../firebase';
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
      const newDocRef = doc(ref, (nextId + index).toString());
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
      endId: nextId + dataArray.length - 1,
      message: 'Documents added successfully'
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
    const q = query(ref, where("categoryId", "==", Number(categoryId)));
    try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        return { success: true, data };
    } catch (e) {
        console.error("Error fetching documents: ", e);
        return { error: "Error fetching documents." };
    }
};

export const getAttributesforProduct = async (productId) => {
    const ref = collection(firebase, 'productAttributes');
    const q = query(ref, where("productId", "==", Number(productId)));
    try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { success: true, data };
    } catch (e) {
        console.error("Error fetching documents: ", e);
        return { error: "Error fetching documents." };
    }
};

export const deleteProductbyId = async (productId) => {
  const productRef = collection(firebase, 'products');
  const productQuery = query(productRef, where("id", "==", productId));
  
  try {
    // First get the product document reference
    const productSnapshot = await getDocs(productQuery);
    
    if (productSnapshot.empty) {
      return { success: false, error: "Product not found" };
    }

    // Get the first matching product document (assuming 'id' is unique)
    const productDocRef = productSnapshot.docs[0].ref;
    
    // Delete the product document
    await deleteDoc(productDocRef);

    // Now delete the corresponding media documents
    const mediaRef = collection(firebase, 'media');
    const mediaQuery = query(mediaRef, where("productId", "==", productId));
    const mediaSnapshot = await getDocs(mediaQuery);

    const batch = writeBatch(firebase);
    mediaSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Now delete the corresponding productAttributes documents
    const attributesRef = collection(firebase, 'productAttributes');
    const attributesQuery = query(attributesRef, where("productId", "==", productId));
    const attributesSnapshot = await getDocs(attributesQuery);

    attributesSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    console.log("Product and corresponding media and attributes deleted successfully");
    return { success: true, productId };
    
  } catch (error) {
    console.error("Error deleting product and related documents: ", error);
    return { success: false, error: error.message };
  }
};

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
    const ref = collection(firebase, 'attributes');
    try {
        const querySnapshot = await getDocs(ref);
        const attributes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { success: true, data: attributes };
    } catch (error) {
        console.error("Error fetching attributes: ", error);
        return { success: false, error: error.message };
    }
};

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

export const deleteCategory = async (categoryId) => {
  const categoryRef = collection(firebase, 'categories');
  const categoryQuery = query(categoryRef, where("id", "==", Number(categoryId)));
  
  try {
    // First get the category document reference
    const categorySnapshot = await getDocs(categoryQuery);
    
    if (categorySnapshot.empty) {
      return { success: false, error: "Category not found" };
    }

    // Get the first matching category document (assuming 'id' is unique)
    const categoryDocRef = categorySnapshot.docs[0].ref;
    
    // Delete the category document
    await deleteDoc(categoryDocRef);
    
    // Now delete the corresponding attributes
    const attributesRef = collection(firebase, 'attributes');
    const attributesQuery = query(attributesRef, where("categoryId", "==", Number(categoryId)));
    const attributesSnapshot = await getDocs(attributesQuery);

    const batch = writeBatch(firebase);
    attributesSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    console.log("Category and corresponding attributes deleted successfully");
    return { success: true, categoryId };
    
  } catch (error) {
    console.error("Error deleting category and attributes: ", error);
    return { success: false, error: error.message };
  }
};
  
  
  export const fetchCategoryById = async (categoryId) => {
        console.log(typeof categoryId, categoryId);
      const ref = collection(firebase, 'categories');
      const q = query(ref, where("id", "==", Number(categoryId)));
      
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
  
  //colors
  
  // Function to add a new color to the Colors collection
  export const addColor = async (colorData) => {
    const ref = collection(firebase, 'Colors');
    try {
      const docRef = await addDoc(ref, colorData);
      console.log("Color added with ID: ", docRef.id);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error adding color: ", error);
      return { success: false, error: error.message };
    }
  };
  
  // Function to edit an existing color in the Colors collection
  export const editColor = async (colorId, colorData) => {
    const docRef = doc(firebase, 'Colors', colorId);
    try {
      await updateDoc(docRef, colorData);
      console.log("Color updated with ID: ", colorId);
      return { success: true };
    } catch (error) {
      console.error("Error updating color: ", error);
      return { success: false, error: error.message };
    }
  };
  
  // Function to delete a color from the Colors collection
  export const deleteColor = async (colorId) => {
    const docRef = doc(firebase, 'Colors', colorId);
    try {
      await deleteDoc(docRef);
      console.log("Color deleted with ID: ", colorId);
      return { success: true };
    } catch (error) {
      console.error("Error deleting color: ", error);
      return { success: false, error: error.message };
    }
  };
  
  export const getAllColors = async () => {
      const ref = collection(firebase, 'Colors');
      try {
        const querySnapshot = await getDocs(ref);
        const colors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { success: true, data: colors };
      } catch (error) {
        console.error("Error getting colors: ", error);
        return { success: false, error: error.message };
      }
  };
  
  export const getColorById = async (colorId) => {
    const docRef = doc(firebase, 'Colors', colorId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Color not found');
      }
    } catch (error) {
      console.error('Error fetching color:', error);
      throw error;
    }
  };
  
  // Add the getCategoryById method
  export const getCategoryById = async (categoryId) => {
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

// Function to delete media data from Firestore
export const deleteMedia = async (mediaId) => {
    const ref = doc(firebase, 'media', mediaId);
    try {
      await deleteDoc(ref);
      console.log("Media document deleted with ID: ", mediaId);
      return { success: true };
    } catch (e) {
      console.error("Error deleting media document: ", e);
      return { error: "Error deleting media document." };
    }
  };


export const getMediaByProductId = async (productId) => {
    const mediaRef = collection(firebase, 'media');
    const mediaQuery = query(mediaRef, where("productId", "==", Number(productId)));
    
    try {
      const querySnapshot = await getDocs(mediaQuery);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { success: true, data };
    } catch (e) {
      console.error("Error fetching media documents: ", e);
      return { error: "Error fetching media documents." };
    }
  };

export const updateMedia = async (mediaId, mediaData) => {
    const mediaRef = collection(firebase, 'media');
    const mediaQuery = query(mediaRef, where("id", "==", mediaId));
    
    try {
      const querySnapshot = await getDocs(mediaQuery);
      
      if (querySnapshot.empty) {
        return { success: false, error: "Media not found" };
      }
      
      const mediaDocRef = querySnapshot.docs[0].ref;
      await updateDoc(mediaDocRef, mediaData);
      
      return { success: true };
    } catch (e) {
      console.error("Error updating media document: ", e);
      return { error: "Error updating media document." };
    }
  };

export const updateProductAttributes = async (productId, attributes) => {
  const batch = writeBatch(firebase);
  const ref = collection(firebase, 'productAttributes');

  attributes.forEach(attr => {
    const docRef = doc(ref, attr.id.toString());
    batch.set(docRef, {
      productId,
      attributeId: attr.id,
      value: attr.value,
      updatedAt: new Date(),
      createdAt: attr.createdAt || new Date()
    }, { merge: true });
  });

  try {
    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error("Error updating product attributes: ", error);
    return { success: false, error: error.message };
  }
};

export const getProductDetailsById = async (productId) => {
    const productRef = collection(firebase, 'products');
    const mediaRef = collection(firebase, 'media');
    const productQuery = query(productRef, where("id", "==", productId));
    const mediaQuery = query(mediaRef, where("productId", "==", productId));

    try {
        const productSnapshot = await getDocs(productQuery);
        const mediaSnapshot = await getDocs(mediaQuery);

        if (productSnapshot.empty) {
            return { success: false, error: "Product not found" };
        }

        const product = productSnapshot.docs[0].data();
        const media = mediaSnapshot.docs.map(doc => doc.data());

        return { success: true, data: { product, media } };
    } catch (error) {
        console.error("Error fetching product details: ", error);
        return { success: false, error: error.message };
    }
};