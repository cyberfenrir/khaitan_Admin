import { firebase } from '../firebase';
import { addDoc, collection, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const addBanner = async (bannerData) => {
  const ref = collection(firebase, 'Banners');
  try {
    const docRef = await addDoc(ref, bannerData);
    console.log("Banner added with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding banner: ", error);
    return { success: false, error: error.message };
  }
};

export const editBanner = async (bannerId, bannerData, newMediaFiles) => {
  const docRef = doc(firebase, 'Banners', bannerId);
  try {
    let mediaURLs = bannerData.media;
    if (newMediaFiles.length > 0) {
      const newMediaURLs = await uploadBannerMedia(newMediaFiles);
      mediaURLs = [...mediaURLs, ...newMediaURLs];
    }
    await updateDoc(docRef, { ...bannerData, media: mediaURLs });
    console.log("Banner updated with ID: ", bannerId);
    return { success: true };
  } catch (error) {
    console.error("Error updating banner: ", error);
    return { success: false, error: error.message };
  }
};

export const deleteBanner = async (bannerId) => {
  const docRef = doc(firebase, 'Banners', bannerId);
  try {
    await deleteDoc(docRef);
    console.log("Banner deleted with ID: ", bannerId);
    return { success: true };
  } catch (error) {
    console.error("Error deleting banner: ", error);
    return { success: false, error: error.message };
  }
};

export const getAllBanners = async () => {
  const ref = collection(firebase, 'Banners');
  try {
    const querySnapshot = await getDocs(ref);
    const banners = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: banners };
  } catch (error) {
    console.error("Error getting banners: ", error);
    return { success: false, error: error.message };
  }
};

export const getBannerById = async (bannerId) => {
  const docRef = doc(firebase, 'Banners', bannerId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Banner not found');
    }
  } catch (error) {
    console.error('Error fetching banner:', error);
    throw error;
  }
};

export const uploadBannerMedia = async (files) => {
  const storage = getStorage();
  const uploadPromises = Array.from(files).map(async (file) => {
    const storageRef = ref(storage, `banners/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  });
  const downloadURLs = await Promise.all(uploadPromises);
  return downloadURLs;
};

