// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 HARD BLOCK unverified users (except Google)
  if (user.provider !== "google.com" && !user.emailVerified) {
    return <Navigate to="/verify" replace />;
  }

  // Admin-only check
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
