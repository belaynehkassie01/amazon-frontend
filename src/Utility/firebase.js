import firebase from "firebase/compat/app";
import { getAuth } from 'firebase/auth';
import "firebase/compat/firestore";
import "firebase/compat/auth";
// import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxuwUiMvzKvdUraJ62qn5OhVD7yIwh5Tc",
  authDomain: "clone-fc6e4.firebaseapp.com",
  projectId: "clone-fc6e4",
  storageBucket: "clone-fc6e4.firebasestorage.app",
  messagingSenderId: "513588039926",
  appId: "1:513588039926:web:8ebafc3c75f0c64fe41cd7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();