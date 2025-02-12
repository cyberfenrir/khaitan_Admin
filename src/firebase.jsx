// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANrY37ufn4EZ3u-pQ9IFghzsnEH6P-g7U",
  authDomain: "khaitanadmin.firebaseapp.com",
  projectId: "khaitanadmin",
  storageBucket: "khaitanadmin.firebasestorage.app",
  messagingSenderId: "800095770692",
  appId: "1:800095770692:web:1878e10b2c184042dbc411"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase = getFirestore(app);