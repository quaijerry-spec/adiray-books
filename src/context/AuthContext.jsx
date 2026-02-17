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

  // 🔹 Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const role = docSnap.exists() ? docSnap.data().role : "user";

        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "",
          role,
          emailVerified: currentUser.emailVerified,
          provider: currentUser.providerData[0]?.providerId,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Signup (email/password)
  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;

    // Send verification email
    await sendEmailVerification(newUser);

    // Save user to Firestore
    await setDoc(doc(db, "users", newUser.uid), {
      role: "user",
      email: newUser.email,
      displayName: newUser.displayName || "",
      createdAt: new Date(),
    });

    // Update context with unverified user
    setUser({
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName || "",
      role: "user",
      emailVerified: newUser.emailVerified,
      provider: newUser.providerData[0]?.providerId,
    });

    return newUser;
  };

  // 🔹 Login (email/password)
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const loggedInUser = userCredential.user;

    // Block unverified users
    if (!loggedInUser.emailVerified && loggedInUser.providerData[0]?.providerId !== "google.com") {
      await signOut(auth);
      throw new Error("Please verify your email before logging in.");
    }

    const docRef = doc(db, "users", loggedInUser.uid);
    const docSnap = await getDoc(docRef);
    const role = docSnap.exists() ? docSnap.data().role : "user";

    setUser({
      uid: loggedInUser.uid,
      email: loggedInUser.email,
      displayName: loggedInUser.displayName || "",
      role,
      emailVerified: loggedInUser.emailVerified,
      provider: loggedInUser.providerData[0]?.providerId,
    });

    return loggedInUser;
  };

  // 🔹 Google login
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
      displayName: googleUser.displayName || "",
      createdAt: new Date(),
    });
  }

  // ✅ Set user state safely
  setUser({
    uid: googleUser.uid,
    email: googleUser.email,
    displayName: googleUser.displayName || "",
    role: docSnap.exists() ? docSnap.data().role : "user",
    emailVerified: googleUser.emailVerified,
    provider: googleUser.providerData?.[0]?.providerId || "google.com",
  });

  return googleUser;
};

  // 🔹 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // 🔹 Resend verification email
  const resendVerification = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  // 🔹 Reset password
  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  // 🔹 Refresh user to check if email verified
  const refreshUser = async () => {
    if (auth.currentUser) {
      await reload(auth.currentUser);
      const refreshed = auth.currentUser.emailVerified;
      if (refreshed) {
        setUser((prev) => ({ ...prev, emailVerified: true }));
      }
      return refreshed;
    }
    return false;
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
