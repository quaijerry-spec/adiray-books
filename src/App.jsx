import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <CartProvider>
      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        <Route
          path="/"
          element={<Home search={search} setSearch={setSearch} />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </CartProvider>
  );
}
