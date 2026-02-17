// pages/Account.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

export default function Account() {
  const { user, logout } = useAuth();

  return (
    <div className="pt-32 min-h-screen bg-gray-100">
      {!user ? (
        <AuthForm />
      ) : (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold mb-6">
            Welcome, {user.displayName || user.email}
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <Link
              to="/profile"
              className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              Profile
            </Link>
            <Link
              to="/orders"
              className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              Orders
            </Link>
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              >
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={logout}
              className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
