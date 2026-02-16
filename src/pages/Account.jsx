import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export default function Account() {
  const [user, setUser] = useState(null);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
    return (
    <div className="pt-32 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">My Account</h1>

        {!user ? (
          <div>
            <p className="text-gray-600 mb-4">You are not logged in.</p>
            <button
              onClick={loginWithGoogle}
              className="px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              Login with Google
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">Welcome, {user.displayName}</p>

            <div className="flex flex-col md:flex-row gap-4">
              <button className="px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-orange-600 transition">
                Profile
              </button>
              <button className="px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-orange-600 transition">
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
