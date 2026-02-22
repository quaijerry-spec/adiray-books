// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { user, refreshUser, resendVerification } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Redirect immediately if already verified (or Google)
  useEffect(() => {
    if (user && (user.emailVerified || user.provider === "google.com")) {
      navigate("/account", { replace: true });
    }
  }, [user, navigate]);

  // 🔹 Handle "I Verified My Email" click
  const handleVerifiedClick = async () => {
    if (!user) return;

    setLoading(true);
    setMessage(""); // reset previous message

    try {
      const verified = await refreshUser();
      if (verified) {
        setMessage("✅ Email verified! Redirecting...");
        setTimeout(() => navigate("/account", { replace: true }), 1000);
      } else {
        setMessage("⚠️ Email not verified yet. Please check your inbox.");
      }
    } catch (err) {
      setMessage("⚠️ Error checking verification status. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle resend verification
  const handleResend = async () => {
    if (!user) return;

    setLoading(true);
    setMessage("");

    try {
      await resendVerification();
      setMessage("✅ Verification email sent again!");
    } catch (err) {
      setMessage("⚠️ Failed to resend verification email.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>

      {user && (
        <p className="mb-4 text-center text-gray-700">
          We sent a verification email to <strong>{user.email}</strong>.
          <br />
          Click the link in your email to confirm, then press "I Verified My Email".
        </p>
      )}

      {message && (
        <p
          className={`mb-4 text-center ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
          role="alert"
        >
          {message}
        </p>
      )}

      <div className="flex flex-col gap-4">
        <button
          onClick={handleVerifiedClick}
          disabled={loading || !user}
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? "Checking..." : "I Verified My Email"}
        </button>

        <button
          onClick={handleResend}
          disabled={loading || !user}
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
}
