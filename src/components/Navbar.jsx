import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar({ onSearch }) {
  const { cart } = useCart();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white sticky top-0 z-50">
      <h1 className="text-2xl font-bold">AdiRay Books</h1>

      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search books..."
        className="px-3 py-2 rounded-lg text-black focus:outline-none w-64"
      />

      <button className="relative text-2xl">
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
