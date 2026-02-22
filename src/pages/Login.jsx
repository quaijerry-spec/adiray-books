// src/pages/Login.jsx
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "quaijerry@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    }
  }, [user, navigate]);

  return (
    <div className="pt-32 min-h-screen bg-gray-100 flex justify-center">
      <AuthForm />
      <button
  onClick={async () => {
    const email = prompt("Enter your email for password reset:");
    if (email) {
      await resetPassword(email);
      alert("Password reset email sent.");
    }
  }}
  className="text-sm text-orange-500 hover:underline"
>
  Forgot Password?
</button>
    </div>
  );
}
