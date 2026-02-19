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
  sendPasswordResetEmail,
  reload,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 CORRECT AUTH STATE LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      const role = docSnap.exists() ? docSnap.data().role : "user";

      setUser({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || "",
        role,
        emailVerified: currentUser.emailVerified,
        provider: currentUser.providerData?.[0]?.providerId || null,
      });

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // SIGNUP
  const signup = async (email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await sendEmailVerification(cred.user);

    await setDoc(doc(db, "users", cred.user.uid), {
      role: "user",
      email: cred.user.email,
      displayName: cred.user.displayName || "",
      createdAt: new Date(),
    });
  };

  // LOGIN
  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    if (!cred.user.emailVerified) {
      await signOut(auth);
      throw new Error("Please verify your email before logging in.");
    }
  };

  // 🔥 GOOGLE LOGIN (SAFE)
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const googleUser = result.user;

    const docRef = doc(db, "users", googleUser.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        role: "user",
        email: googleUser.email,
        displayName: googleUser.displayName || "",
        createdAt: new Date(),
      });
    }

    // DO NOT manually setUser here.
    // onAuthStateChanged will handle it automatically.
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resendVerification = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const refreshUser = async () => {
    if (!auth.currentUser) return false;
    await reload(auth.currentUser);
    return auth.currentUser.emailVerified;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
        resendVerification,
        resetPassword,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
