// AdiRayBooks_AuthSystem.jsx // Complete Firebase Auth System with: // - Auth Context // - Email/Password Signup + Verification // - Login // - Google Sign-In // - Password Reset // - Protected Route

import React, { createContext, useContext, useEffect, useState } from "react"; import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"; import { initializeApp } from "firebase/app"; import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signOut, onAuthStateChanged, } from "firebase/auth"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { motion } from "framer-motion";

// 🔥 Replace with your real Firebase config const firebaseConfig = { apiKey: "YOUR_API_KEY", authDomain: "YOUR_AUTH_DOMAIN", projectId: "YOUR_PROJECT_ID", appId: "YOUR_APP_ID", };

initializeApp(firebaseConfig); const auth = getAuth(); const provider = new GoogleAuthProvider();

// ================= AUTH CONTEXT =================

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => { const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);

useEffect(() => { const unsubscribe = onAuthStateChanged(auth, (currentUser) => { setUser(currentUser); setLoading(false); }); return () => unsubscribe(); }, []);

const signup = async (email, password) => { const cred = await createUserWithEmailAndPassword(auth, email, password); await sendEmailVerification(cred.user); return cred; };

const login = async (email, password) => { const cred = await signInWithEmailAndPassword(auth, email, password); if (!cred.user.emailVerified) { await signOut(auth); throw new Error("Please verify your email before logging in."); } return cred; };

const googleLogin = () => signInWithPopup(auth, provider);

const resetPassword = (email) => sendPasswordResetEmail(auth, email);

const logout = () => signOut(auth);

const value = { user, signup, login, googleLogin, resetPassword, logout, };

return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>; };

// ================= UI COMPONENT =================

const AuthPage = () => { const { signup, login, googleLogin, resetPassword } = useAuth(); const navigate = useNavigate(); const [isLogin, setIsLogin] = useState(true); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [message, setMessage] = useState("");

const handleSubmit = async () => { try { if (isLogin) { await login(email, password); navigate("/"); } else { await signup(email, password); setMessage("Verification email sent. Check your inbox."); } } catch (err) { setMessage(err.message); } };

const handleGoogle = async () => { try { await googleLogin(); navigate("/"); } catch (err) { setMessage(err.message); } };

const handleReset = async () => { try { await resetPassword(email); setMessage("Password reset email sent."); } catch (err) { setMessage(err.message); } };

return ( <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4"> <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}> <Card className="w-[380px] rounded-2xl shadow-xl"> <CardContent className="p-6 space-y-4"> <h2 className="text-2xl font-bold text-center"> {isLogin ? "Login" : "Create Account"} </h2>

<input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded-xl"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded-xl"
        />

        <Button className="w-full" onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </Button>

        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          Sign in with Google
        </Button>

        {isLogin && (
          <button onClick={handleReset} className="text-sm text-blue-500">
            Forgot Password?
          </button>
        )}

        <p className="text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

        {message && <p className="text-sm text-center text-red-500">{message}</p>}
      </CardContent>
    </Card>
  </motion.div>
</div>

); };

// ================= PROTECTED ROUTE =================

const ProtectedRoute = ({ children }) => { const { user } = useAuth(); if (!user) return <Navigate to="/auth" />; return children; };

// ================= APP =================

export default function App() { return ( <Router> <AuthProvider> <Routes> <Route path="/auth" element={<AuthPage />} /> <Route path="/" element={ <ProtectedRoute> <div className="p-10 text-xl">Welcome to AdiRay Books Dashboard 🎉</div> </ProtectedRoute> } /> </Routes> </AuthProvider> </Router> ); }
