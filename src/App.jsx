import Books from "./components/Books";
import Cart from "./components/Cart";
import { useState } from "react";
import { useCart } from "./context/CartContext";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const { cart } = useCart();

  return (
    <div>
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">AdiRay Books</h1>

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

      {/* CONTENT */}
      {showCart ? <Cart /> : <Books />}
    </div>
  );
}
