import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import Hero from "./components/Hero";
import Books from "./components/Books";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <>
      {/* HERO SECTION */}
      <Hero />

      {/* PAGE CONTENT */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </motion.main>
    </>
  );
}
