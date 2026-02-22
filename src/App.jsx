// src/App.jsx
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers"; // ✅ Admin users management page
import VerifyEmail from "./pages/VerifyEmail"; // ✅ Verify email page
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
            <Route path="/" element={<Home search={search} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />

            {/* 🔹 Verify email route */}
            <Route path="/verify" element={<VerifyEmail />} />

            {/* 🔹 Protected pages */}
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
