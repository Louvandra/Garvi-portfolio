import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";
// import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0kX1XPeMjJwDE3_27LKfZJ_8BW-es9U4",
  authDomain: "db-data-f6bae.firebaseapp.com",
  projectId: "db-data-f6bae",
  storageBucket: "db-data-f6bae.appspot.com",
  messagingSenderId: "338516822141",
  appId: "1:338516822141:web:690a88b1a07c4343120914"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const d = getFirestore(app);
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export{db, storage, auth, provider, signInWithPopup,};