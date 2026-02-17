// src/components/ProtectedRoute.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, resendVerification } = useAuth();
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Wait for auth to initialize
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // 🔹 Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 🔹 Email not verified (except Google users)
  if (!user.emailVerified && user.provider !== "google.com") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-500">
          Email Verification Required
        </h2>

        <p className="mb-6 text-gray-600 max-w-md">
          Please verify your email address before accessing this page.
          Check your inbox and spam folder.
        </p>

        <button
          onClick={async () => {
            if (!resendVerification) return;
            try {
              setResending(true);
              setMessage("");
              await resendVerification();
              setMessage("Verification email sent successfully.");
            } catch (error) {
              setMessage("Failed to send verification email. Try again.");
            } finally {
              setResending(false);
            }
          }}
          disabled={resending}
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition disabled:opacity-50"
        >
          {resending ? "Sending..." : "Resend Verification Email"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-gray-700">
            {message}
          </p>
        )}

        <button
          onClick={() => window.location.reload()}
          className="mt-6 text-sm text-orange-500 hover:underline"
        >
          I've Verified — Refresh Page
        </button>
      </div>
    );
  }

  // 🔹 Admin-only protection
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/account" />;
  }

  return children;
      }
