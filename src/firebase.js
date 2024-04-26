// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBekE4cKUTN_j61g3VaJJs9bThR2QVeLZE",
  authDomain: "svelte-crud-1463a.firebaseapp.com",
  projectId: "svelte-crud-1463a",
  storageBucket: "svelte-crud-1463a.appspot.com",
  messagingSenderId: "3642141787",
  appId: "1:3642141787:web:586ae3504a679e482ae37e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

