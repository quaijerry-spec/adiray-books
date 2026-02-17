// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    // Show a loading spinner while auth initializes
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Not logged in
  if (!user) return <Navigate to="/login" />;

  // Email not verified
  if (!user.emailVerified && user.provider !== "google.com") {
  return <Navigate to="/login" />;
  }
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <p className="mb-4 text-red-500">
          Please verify your email before accessing this page.
        </p>
        <button
          onClick={() => window.location.reload()} // simple way to try again after verification
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          Reload After Verification
        </button>
      </div>
    );
  }

  // Admin-only check
  if (adminOnly && user.role !== "admin") return <Navigate to="/account" />;

  return children;
}
