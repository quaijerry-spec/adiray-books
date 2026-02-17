// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd_q9GpUeLERYaAhTfSksx3eKDPchczFQ",
  authDomain: "adiray-books-1234.firebaseapp.com",
  projectId: "adiray-books-1234",
  storageBucket: "adiray-books-1234.appspot.com",
  messagingSenderId: "554330985579",
  appId: "1:554330985579:web:14778bd9a56ea0f159cd2e",
};

const app = initializeApp(firebaseConfig);

// ✅ Export auth and Firestore db
export const auth = getAuth(app);
export const db = getFirestore(app);
