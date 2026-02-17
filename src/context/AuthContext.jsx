// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // If email not verified, treat as null (except for Google sign-in)
        if (!currentUser.emailVerified && !currentUser.providerData.some(p => p.providerId === "google.com")) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Fetch role from Firestore
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const role = docSnap.exists() ? docSnap.data().role : "user";

        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          role,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Email/password signup
  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;

    // Send verification email
    await sendEmailVerification(newUser);

    // Save user role to Firestore
    await setDoc(doc(db, "users", newUser.uid), {
      role: "user", // default
      email: newUser.email,
      displayName: newUser.displayName || "",
      createdAt: new Date(),
    });

    return newUser;
  };

  // Email/password login
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const loggedInUser = userCredential.user;

    if (!loggedInUser.emailVerified) {
      await signOut(auth);
      throw new Error("Please verify your email before logging in.");
    }

    // Fetch role from Firestore
    const docRef = doc(db, "users", loggedInUser.uid);
    const docSnap = await getDoc(docRef);
    const role = docSnap.exists() ? docSnap.data().role : "user";

    setUser({
      uid: loggedInUser.uid,
      email: loggedInUser.email,
      displayName: loggedInUser.displayName,
      role,
    });

    return loggedInUser;
  };

  // Google login
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const googleUser = result.user;

    // Check Firestore role
    const docRef = doc(db, "users", googleUser.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        role: "user",
        email: googleUser.email,
        displayName: googleUser.displayName,
        createdAt: new Date(),
      });
    }

    setUser({
      uid: googleUser.uid,
      email: googleUser.email,
      displayName: googleUser.displayName,
      role: docSnap.exists() ? docSnap.data().role : "user",
    });

    return googleUser;
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
