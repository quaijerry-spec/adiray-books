import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Books from "./components/Books";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar
        onCartClick={() => setShowCart(true)}
        onSearch={setSearch}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Books search={search} />
            </>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </div>
  );
}
