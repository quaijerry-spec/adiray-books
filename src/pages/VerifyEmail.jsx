import React from "react";
import { useAuth } from "../context/AuthContext";

export default function VerifyEmail() {
  const { resendVerification, refreshUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h2 className="text-xl mb-4 text-red-500">
        Please verify your email to continue.
      </h2>

      <button
        onClick={async () => {
          const verified = await refreshUser();
          if (verified) {
            window.location.href = "/";
          } else {
            alert("Email not verified yet.");
          }
        }}
        className="px-6 py-3 bg-orange-500 text-white rounded-full mb-2"
      >
        I Verified My Email
      </button>

      <button
        onClick={async () => {
          await resendVerification();
          alert("Verification email sent again!");
        }}
        className="px-6 py-3 bg-orange-500 text-white rounded-full"
      >
        Resend Verification Email
      </button>
    </div>
  );
}
