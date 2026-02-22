// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { user, resendVerification, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Poll for email verification
  useEffect(() => {
    let intervalId;

    if (user && !user.emailVerified && user.provider !== "google.com") {
      intervalId = setInterval(async () => {
        const verified = await refreshUser();
        if (verified) {
          clearInterval(intervalId);
          setMessage("✅ Email verified! Redirecting...");
          setTimeout(() => {
            navigate("/account", { replace: true });
          }, 1000);
        }
      }, 3000); // check every 3 seconds
    } else if (user && user.emailVerified) {
      // Already verified
      navigate("/account", { replace: true });
    }

    return () => clearInterval(intervalId);
  }, [user, navigate, refreshUser]);

  const handleResend = async () => {
    setLoading(true);
    setMessage("");
    try {
      await resendVerification();
      setMessage("✅ Verification email sent again!");
    } catch (err) {
      setMessage("⚠️ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>

      <p className="mb-4">
        We sent a verification link to <strong>{user?.email}</strong>.
        <br />
        Please click the link in your email to confirm your account.
      </p>

      {message && (
        <p
          className={`mb-4 ${message.includes("✅") ? "text-green-600" : "text-red-500"}`}
          role="alert"
        >
          {message}
        </p>
      )}

      <button
        onClick={handleResend}
        disabled={loading}
        className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
      >
        Resend Verification Email
      </button>
    </div>
  );
}
