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

import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const [search, setSearch] = useState("");
  const location = useLocation(); // needed for AnimatePresence

  // Admin-only route wrapper
  function ProtectedAdminRoute({ children }) {
    const { user } = useAuth();
    return user?.role === "admin" ? children : <Navigate to="/account" />;
  }

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

            {/* Protected account routes */}
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

            {/* Admin-only route */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </CartProvider>
  );
}
