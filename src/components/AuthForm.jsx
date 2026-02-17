// src/components/AuthForm.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
  const { signup, login, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (mode === "login") await login(email, password);
      if (mode === "signup") await signup(email, password);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-4">
        {mode === "login" ? "Login" : "Create Account"}
      </h2>

      {message && <p className="text-red-500 mb-4">{message}</p>}

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full mb-4 bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition"
      >
        Continue with Google
      </button>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition"
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>

      <div className="flex justify-between mt-4 text-sm text-gray-600">
        {mode === "login" ? (
          <button onClick={() => setMode("signup")}>Create account</button>
        ) : (
          <button onClick={() => setMode("login")}>Back to login</button>
        )}
      </div>
    </div>
  );
}
