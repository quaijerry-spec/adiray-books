import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) return alert("Enter your email first.");
    try {
      await resetPassword(email);
      alert("Check your email for reset link.");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button className="bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600 transition">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="mt-3 w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 transition"
        >
          Sign in with Google
        </button>

        <button
          onClick={handleResetPassword}
          className="mt-3 text-blue-500 underline"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}
