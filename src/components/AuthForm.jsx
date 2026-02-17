import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

export default function AuthForm() {
  const { signup, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // login | signup | reset
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const provider = new GoogleAuthProvider();

  // 🔐 Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Email Auth
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      if (mode === "login") {
        await login(email, password);
      } else if (mode === "signup") {
        await signup("User", email, password);
      } else if (mode === "reset") {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset email sent!");
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-4">
        {mode === "login"
          ? "Login"
          : mode === "signup"
          ? "Create Account"
          : "Reset Password"}
      </h2>

      {message && <p className="mb-4 text-red-500">{message}</p>}

      {mode !== "reset" && (
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mb-4 bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition"
        >
          Continue with Google
        </button>
      )}

      <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />

        {mode !== "reset" && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition"
        >
          {mode === "login"
            ? "Login"
            : mode === "signup"
            ? "Sign Up"
            : "Send Reset Email"}
        </button>
      </form>

      <div className="flex justify-between mt-4 text-sm text-gray-600">
        {mode !== "signup" && (
          <button onClick={() => setMode("signup")}>Create account</button>
        )}
        {mode !== "login" && (
          <button onClick={() => setMode("login")}>Back to login</button>
        )}
        {mode !== "reset" && (
          <button onClick={() => setMode("reset")}>Forgot password?</button>
        )}
      </div>
    </div>
  );
}
