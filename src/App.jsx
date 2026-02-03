import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Books from "./components/Books";
import Cart from "./components/Cart";

export default function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <Navbar toggleCart={() => setShowCart(!showCart)} />

      {!showCart && <Hero />}

      <main className="max-w-6xl mx-auto px-6 mt-16">
        {showCart ? <Cart /> : <Books />}
      </main>
    </div>
  );
}
