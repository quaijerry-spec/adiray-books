import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Books from "./components/Books";
import Cart from "./components/Cart";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Navbar setShowCart={setShowCart} search={search} setSearch={setSearch} />
      <Hero />
      {showCart && <Cart setShowCart={setShowCart} />}
      <Books search={search} />
    </div>
  );
}
