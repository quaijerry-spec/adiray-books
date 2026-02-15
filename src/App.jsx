import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function App() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  return (
    <CartProvider>
      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        <AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    <Routes location={location}>
      <Route path="/" element={<Home search={search} />} />
      <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      /motion.div>
</AnimatePresence>
    <Footer />
    </CartProvider>
  );
}
