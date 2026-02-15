import React from "react";

export default function Account() {
  return (
    <div className="pt-32 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">My Account</h1>

        <p className="text-gray-600 mb-4">
          Welcome to your account dashboard. You can view your profile, orders, and settings here.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <button className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
            Profile
          </button>
          <button className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
            Orders
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
