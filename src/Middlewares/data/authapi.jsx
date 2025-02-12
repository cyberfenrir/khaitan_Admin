// src/Middlewares/data/authapi.js
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, firebase } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const signUp = async (name, email, password) => {
  try {
    // Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    const user = userCredential.user;

    // Update the user's display name
    await updateProfile(user, { displayName: name });

    // Store user data in Firestore
    await setDoc(doc(firebase, 'users', user.uid), {
      name,
      email,
      createdAt: new Date(),
    });

    // Return token and default role
    return { token: user.accessToken, role: 'user' };
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  console.log("Not implemented method");
}
