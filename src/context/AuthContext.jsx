// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // You can add role info here if you store roles in Firebase (example: admin)
      // For now, we add a default role
      if (currentUser) {
        const isAdmin = currentUser.email === "admin@example.com"; // CHANGE to your admin email
        setUser({ ...currentUser, role: isAdmin ? "admin" : "user" });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const isAdmin = result.user.email === "admin@example.com"; // set admin by email
    setUser({ ...result.user, role: isAdmin ? "admin" : "user" });
  };
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
