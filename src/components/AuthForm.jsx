// components/AuthForm.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function AuthForm() {
  const { signup, login, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState("login"); // login | signup | reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Google login
  const handleGoogleLogin = async () => {
    setMessage("");
    try {
      setLoading(true);
      await loginWithGoogle(); // context handles provider & Firestore
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Email/password auth
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      if (mode === "login") {
        await login(email, password);
      } else if (mode === "signup") {
        await signup(email, password); // context saves default role
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

      {message && <p className="text-red-500 mb-4">{message}</p>}

      {mode !== "reset" && (
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mb-4 bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition"
        >
          Continue with Google
        </button>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />

        {mode !== "reset" && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-full transition ${
            mode === "reset"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {mode === "login"
            ? "Login"
            : mode === "signup"
            ? "Sign Up"
            : "Send Reset Email"}
        </button>
      </form>

      <div className="flex justify-between mt-4 text-sm text-gray-600">
        {mode === "login" && (
          <button onClick={() => setMode("signup")}>Create account</button>
        )}
        {mode === "signup" && (
          <button onClick={() => setMode("login")}>Back to login</button>
        )}
        {mode !== "reset" && (
          <button onClick={() => setMode("reset")}>Forgot password?</button>
        )}
      </div>
    </div>
  );
}
