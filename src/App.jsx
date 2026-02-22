import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import VerifyEmail from "./pages/VerifyEmail"; // ✅ Email verification page
import AdminUsers from "./pages/AdminUsers"; // ✅ Admin management page
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

// 🔹 ProtectedRoute for both regular and admin-only access
function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    // Could add a spinner here if you want
    return null;
  }

  if (!user) return <Navigate to="/login" replace />;

  // Block unverified users (except Google users)
  if (user.provider !== "google.com" && !user.emailVerified) {
    return <Navigate to="/verify" replace />;
  }

  // Admin-only protection
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/account" replace />;
  }

  return children;
}

export default function App() {
  const [search, setSearch] = useState("");
  const location = useLocation();

  return (
    <CartProvider>
      <Navbar search={search} setSearch={setSearch} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Home search={search} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<VerifyEmail />} />

            {/* Protected Routes */}
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

            {/* Admin-only Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </CartProvider>
  );
}
