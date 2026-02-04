import React, { useState } from "react";
import Books from "./components/Books";
import Cart from "./components/Cart";
import Hero from "./components/Hero";

export default function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">AdiRay Books</h1>

        <button
          onClick={() => setShowCart(!showCart)}
          className="relative text-2xl"
        >
          🛒
          {/* Cart count badge */}
          <Cart.Consumer>
            {({ cart }) =>
              cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 rounded-full">
                  {cart.length}
                </span>
              )
            }
          </Cart.Consumer>
        </button>
      </nav>

      {/* HERO SECTION */}
      <Hero />

      {/* CONTENT */}
      <div className="px-6 py-4">
        {showCart ? <Cart /> : <Books />}
      </div>
    </div>
  );
}
