// src/pages/VerifyEmail.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { user, refreshUser, resendVerification } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Redirect immediately if user is already verified (or Google)
  useEffect(() => {
    if (!user) return;
    if (user.emailVerified || user.provider === "google.com") {
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/account", { replace: true });
      }
    }
  }, [user, navigate]);

  // 🔹 Check if user has verified
  const handleCheckVerification = async () => {
    setLoading(true);
    setMessage("");
    try {
      const verified = await refreshUser();
      if (verified) {
        setMessage("✅ Email verified! Redirecting...");
        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/account", { replace: true });
          }
        }, 1000);
      } else {
        setMessage("⚠️ Email not verified yet. Please check your inbox.");
      }
    } catch (err) {
      setMessage("❌ Error checking verification.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Resend verification email
  const handleResend = async () => {
    setLoading(true);
    setMessage("");
    try {
      await resendVerification();
      setMessage("✅ Verification email sent again!");
    } catch (err) {
      setMessage("❌ Failed to send verification email.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        {user?.email && (
          <p className="mb-4 text-gray-700">
            We sent a verification link to <strong>{user.email}</strong>. 
            Please click the link in your email to confirm.
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
            onClick={handleCheckVerification}
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
    </div>
  );
}
