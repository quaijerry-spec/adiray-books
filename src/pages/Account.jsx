import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Create provider OUTSIDE component (best practice)
const provider = new GoogleAuthProvider();

export default function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track authentication state safely
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading account...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800">
          My Account
        </h1>

        {!user ? (
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              You are not logged in.
            </p>
            <button
              onClick={loginWithGoogle}
              className="px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition font-medium"
            >
              Login with Google
            </button>
          </div>
        ) : (
          <div>
            {/* Profile Section */}
            <div className="flex items-center gap-6 mb-8">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-20 h-20 rounded-full border-2 border-orange-500"
              />
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  {user.displayName}
                </p>
                <p className="text-gray-500 text-sm">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
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
    </div>
  );
}
