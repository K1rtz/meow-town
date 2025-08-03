// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'
import AsyncStorage from  "@react-native-async-storage/async-storage"
import { getFirestore, collection } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-jLyfY9f3SIKrGC6UkUSyCMc1cbFnjn0",
  authDomain: "native-capp.firebaseapp.com",
  projectId: "native-capp",
  storageBucket: "native-capp.firebasestorage.app",
  messagingSenderId: "28002683596",
  appId: "1:28002683596:web:40351a2bb4e71e196c9069"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
    persistance: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export const usersRef = collection(db, 'users')
export const roomRef = collection(db, 'rooms')