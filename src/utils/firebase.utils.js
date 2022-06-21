import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithRedirect,
  signInWithPopup, 
  GoogleAuthProvider
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
}
from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2fduBSkFj6HQwiJgS-Z_OHoEfa6ro5Hk",
  authDomain: "clothing-store-db-f075e.firebaseapp.com",
  projectId: "clothing-store-db-f075e",
  storageBucket: "clothing-store-db-f075e.appspot.com",
  messagingSenderId: "743872255669",
  appId: "1:743872255669:web:b92651f8f6b2cb984510fc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  //If user data doesn't exist
  //Create/set the document with the data from userAuth in my collection
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('Error creating the user ', error.message);
    }
  }

  return userDocRef;

  //Return userDocRef
}