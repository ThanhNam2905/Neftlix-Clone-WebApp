// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0xhaFh9vAtweZfDighNMHHc3cCUd9Uxg",
  authDomain: "netflix-clone-webapp-15155.firebaseapp.com",
  projectId: "netflix-clone-webapp-15155",
  storageBucket: "netflix-clone-webapp-15155.appspot.com",
  messagingSenderId: "356475768381",
  appId: "1:356475768381:web:e14c11d637bc73e55c2454"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };