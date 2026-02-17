// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, resendVerification, refreshUser } = useAuth();

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
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <p className="mb-4 text-red-500">
          ⚠️ Please verify your email before accessing this page.
        </p>

        <button
          onClick={async () => {
            // refresh user status
            const verified = await refreshUser();
            if (verified) {
              window.location.reload();
            } else {
              alert("Email not verified yet. Please check your inbox.");
            }
          }}
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition mb-2"
        >
          I Verified My Email
        </button>

        <button
          onClick={async () => {
            await resendVerification();
            alert("Verification email sent again!");
          }}
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          Resend Verification Email
        </button>
      </div>
    );
  }

  // 🔹 Admin-only check
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/account" />;
  }

  // 🔹 All good, allow access
  return children;
}
