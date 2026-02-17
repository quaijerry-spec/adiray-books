// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, resendVerification } = useAuth();

  // 🔹 Show loading while auth initializes
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // 🔹 Not logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <p className="mb-4 text-red-500">You must be logged in to access this page.</p>
        <a
          href="/login"
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          Go to Login
        </a>
      </div>
    );
  }

  // 🔹 Email not verified (except Google users)
  if (!user.emailVerified && user.provider !== "google.com") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center gap-4">
        <p className="text-red-500">
          Please verify your email before accessing this page.
        </p>
        <button
          onClick={async () => {
            await resendVerification();
            alert("Verification email sent again!");
          }}
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          Resend Verification Email
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-300 text-black rounded-full hover:bg-gray-400 transition"
        >
          Refresh After Verification
        </button>
      </div>
    );
  }

  // 🔹 Admin-only access
  if (adminOnly && user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <p className="mb-4 text-red-500">
          You do not have permission to access this page.
        </p>
        <a
          href="/account"
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          Go to Account
        </a>
      </div>
    );
  }

  // 🔹 Authorized users
  return children;
}
