import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Books from "./components/Books";
import Cart from "./components/Cart";

export default function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar showCart={showCart} setShowCart={setShowCart} />
      <Hero />
      {showCart ? <Cart /> : <Books />}
    </div>
  );
}
