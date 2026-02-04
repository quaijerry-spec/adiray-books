import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Books from "./components/Books";
import Cart from "./components/Cart";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar
        onCartClick={() => setShowCart(true)}
        onSearch={setSearch}
      />

      <Hero />

      <Books search={search} />

      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </div>
  );
}
