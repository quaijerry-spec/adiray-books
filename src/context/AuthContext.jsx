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
import { sendPasswordResetEmail } from "firebase/auth";

const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};
const resendVerification = async () => {
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser);
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Track Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        const role = docSnap.exists() ? docSnap.data().role : "user";

        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
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

  // 🔹 Signup
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

    return newUser;
  };

  // 🔹 Login
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const loggedInUser = userCredential.user;

    if (!loggedInUser.emailVerified) {
      await signOut(auth);
      throw new Error("Please verify your email before logging in.");
    }

    return loggedInUser;
  };

  // 🔹 Google Login
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
        displayName: googleUser.displayName,
        createdAt: new Date(),
      });
    }

    return googleUser;
  };

  // 🔹 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
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
  }}
>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
