// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  // 🔹 Show loading while auth state initializes
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // 🔹 Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // 🔹 Block unverified users (except Google users)
  if (user.provider !== "google.com" && !user.emailVerified) {
    return <Navigate to="/verify" replace />;
  }

  // 🔹 Admin-only pages
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/account" replace />;
  }

  return children;
}
