import React from "react";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.png"; // make sure logo.png exists

export default function Navbar({ showCart, setShowCart }) {
  const { cart } = useCart();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white sticky top-0 z-50">
      <img src={logo} alt="AdiRay Books" className="h-10" />
      <button
        onClick={() => setShowCart(!showCart)}
        className="relative text-2xl"
      >
        🛒
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 rounded-full">
            {cart.length}
          </span>
        )}
      </button>
    </nav>
  );
}
