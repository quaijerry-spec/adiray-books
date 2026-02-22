// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  // 🔹 Wait for auth state to load
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // 🔹 Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 Block unverified email/password users
  if (user.provider !== "google.com" && !user.emailVerified) {
    return <Navigate to="/verify" replace />;
  }

  // 🔹 Admin-only routes
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/account" replace />;
  }

  // 🔹 All good, allow access
  return children;
}
