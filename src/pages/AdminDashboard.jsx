// pages/AdminDashboard.jsx
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="pt-32 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-4 text-gray-600">
          Only users with admin role can see this.
        </p>
      </div>
    </div>
  );
}
