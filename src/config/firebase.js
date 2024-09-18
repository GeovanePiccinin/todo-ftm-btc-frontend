// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOf3OKS3K_3dVmMCphzYKWLo2dmhrnlbM",
  authDomain: "todo-list-gravacoes.firebaseapp.com",
  projectId: "todo-list-gravacoes",
  storageBucket: "todo-list-gravacoes.appspot.com",
  messagingSenderId: "695410747663",
  appId: "1:695410747663:web:c7bbc0044f5e0d04bfb67a",
  measurementId: "G-LWKFV8GG89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
