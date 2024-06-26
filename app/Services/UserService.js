// UserService.js
import { FIRESTORE_DB } from '../../firebaseConfig';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const createUserDocument = async (user) => {
  try {
    await setDoc(doc(FIRESTORE_DB, 'users', user.uid), {
      email: user.email,
      createdAt: new Date()
    });
    console.log('User document created');
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
};

export const getUserDocument = async (uid) => {
  try {
    const userDoc = await getDoc(doc(FIRESTORE_DB, 'users', uid));
    if (userDoc.exists()) {
      console.log('User data:', userDoc.data());
      return userDoc.data();
    } else {
      console.log('No user document found');
    }
  } catch (error) {
    console.error('Error getting user document:', error);
    throw error;
  }
};


export const editUserDocument = async (uid, data) => {
    try {
      const userDocRef = doc(FIRESTORE_DB, 'users', uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        await updateDoc(userDocRef, data);
        console.log('User document updated');
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error updating user document:', error);
    }
  };