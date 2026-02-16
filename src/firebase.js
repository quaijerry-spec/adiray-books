// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd_q9GpUeLERYaAhTfSksx3eKDPchczFQ",
  authDomain: "adiray-books-1234.firebaseapp.com",
  projectId: "adiray-books-1234",
  storageBucket: "adiray-books-1234.appspot.com",
  messagingSenderId: "554330985579",
  appId: "1:554330985579:web:14778bd9a56ea0f159cd2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth to use in your app
export const auth = getAuth(app);

export default app;
