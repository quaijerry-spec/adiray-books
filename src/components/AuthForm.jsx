// src/components/AuthForm.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
  const {
    signup,
    login,
    loginWithGoogle,
    resendVerification,
    refreshUser,
  } = useAuth();

  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  // 🔹 Handle email/password submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
        setMessage("✅ Login successful!");
      } else if (mode === "signup") {
        await signup(email, password);
        setMessage(
          `✅ Account created! We sent a verification email to ${email}. Please verify before logging in.`
        );
        setVerificationSent(true);
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Google login
  const handleGoogleLogin = async () => {
    setMessage("");
    setLoading(true);
    try {
      await loginWithGoogle();
      setMessage("✅ Login successful!");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Resend verification email
  const handleResendVerification = async () => {
    setMessage("");
    setLoading(true);
    try {
      await resendVerification();
      setMessage("✅ Verification email sent again!");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Check if email verified
  const handleCheckVerification = async () => {
    setMessage("");
    setLoading(true);
    try {
      const verified = await refreshUser();
      if (verified) {
        setMessage("✅ Email verified! You can now log in.");
        setVerificationSent(false);
        setMode("login");
      } else {
        setMessage("⚠️ Email not verified yet. Please check your inbox.");
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Switch login/signup mode
  const toggleMode = (newMode) => {
    setMode(newMode);
    setMessage("");
    setVerificationSent(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-4">
        {mode === "login" ? "Login" : "Create Account"}
      </h2>

      {/* Message */}
      {message && (
        <p
          className={`mb-4 ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
          role="alert"
        >
          {message}
        </p>
      )}

      {/* Google login (only for login mode) */}
      {mode === "login" && (
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mb-4 bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition"
        >
          Continue with Google
        </button>
      )}

      {/* Email/password form (login or signup) */}
      {!verificationSent && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-orange-400"
            aria-label="Email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-orange-400"
            aria-label="Password"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
      )}

      {/* Verification pending view */}
      {verificationSent && (
        <div className="flex flex-col items-center gap-4 mt-4">
          <p className="text-gray-700 text-center">
            We sent a verification email to <strong>{email}</strong>. Please click the link in your email to confirm.
          </p>
          <button
            onClick={handleCheckVerification}
            disabled={loading}
            className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
          >
            I Verified My Email
          </button>
          <button
            onClick={handleResendVerification}
            disabled={loading}
            className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
          >
            Resend Verification Email
          </button>
        </div>
      )}

      {/* Toggle login/signup */}
      <div className="flex justify-between mt-4 text-sm text-gray-600">
        {mode === "login" ? (
          <button onClick={() => toggleMode("signup")}>Create account</button>
        ) : (
          <button onClick={() => toggleMode("login")}>Back to login</button>
        )}
      </div>
    </div>
  );
}
