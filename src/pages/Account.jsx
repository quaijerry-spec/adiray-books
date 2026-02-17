import React from "react";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

export default function Account() {
  const { user, logout } = useAuth();

  return (
    <div className="pt-32 min-h-screen bg-gray-100">
      {!user ? (
        <AuthForm />
      ) : (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
            Welcome, {user.displayName || user.email}
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <button className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
              Profile
            </button>

            <button className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
              Orders
            </button>

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
