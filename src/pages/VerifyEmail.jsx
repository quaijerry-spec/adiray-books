// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { user, refreshUser, resendVerification } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Redirect if already verified
  useEffect(() => {
    if (user && (user.emailVerified || user.provider === "google.com")) {
      navigate("/account");
    }
  }, [user, navigate]);

  // 🔹 Handle verification check
  const handleVerifiedClick = async () => {
    if (!user) return;

    setLoading(true);
    const verified = await refreshUser();
    setLoading(false);

    if (verified) {
      setMessage("✅ Email verified! Redirecting...");
      navigate("/account");
    } else {
      setMessage("⚠️ Email not verified yet. Please check your inbox.");
    }
  };

  // 🔹 Resend verification
  const handleResend = async () => {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>

      {user && (
        <p className="mb-4 text-center text-gray-700">
          We sent a verification email to <strong>{user.email}</strong>. Please click the link in your email to confirm.
        </p>
      )}

      {message && (
        <p
          className={`mb-4 ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <div className="flex flex-col gap-4">
        <button
          onClick={handleVerifiedClick}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          I Verified My Email
        </button>

        <button
          onClick={handleResend}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  );
          }
