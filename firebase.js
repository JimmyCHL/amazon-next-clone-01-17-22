// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrA_9XZKSUTm8PcBzMK7J6sdHvi9was5s",
  authDomain: "next-clone-011722.firebaseapp.com",
  projectId: "next-clone-011722",
  storageBucket: "next-clone-011722.appspot.com",
  messagingSenderId: "249204803637",
  appId: "1:249204803637:web:26d7e0e64ee058eca9497c",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();

export { db };
