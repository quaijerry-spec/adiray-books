import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import { CartProvider } from "./context/CartContext";

export default function App() {
  const [search, setSearch] = useState("");
  const location = useLocation(); // needed for AnimatePresence

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
            <Route path="/account" element={<Account />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </CartProvider>
  );
}
