// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase"; // make sure 'db' is Firestore
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // useful for initial auth state

  // Track auth state and fetch role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch Firestore user doc to get role
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser({ uid: currentUser.uid, email: currentUser.email, ...docSnap.data() });
        } else {
          // Default to 'user' role if no doc exists
          setUser({ uid: currentUser.uid, email: currentUser.email, role: "user" });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 🔑 Signup with email/password and store role in Firestore
  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    // store role = "user" by default
    await setDoc(doc(db, "users", uid), {
      email,
      role: "user",
      createdAt: serverTimestamp(),
    });
  };

  // 🔑 Login
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // 🔑 Google login with role check
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const uid = result.user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      // New Google user: add to Firestore with role 'user'
      await setDoc(docRef, {
        email: result.user.email,
        role: "user",
        createdAt: serverTimestamp(),
      });
    }
  };

  // 🔑 Password reset
  const resetPassword = (email) => auth.sendPasswordResetEmail(email);

  // 🔑 Logout
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, loginWithGoogle, resetPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
