import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline"; // Heroicons

export default function Navbar({ search, setSearch }) {
  const { cart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-[#2c5364] py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center text-white font-bold text-xl">
          <img src="/logo.png" alt="AdiRay Books" className="w-12 h-12 mr-2" />
          AdiRay Books
        </Link>

        {/* Search bar */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="🔍 Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
          />
        </div>

        {/* Cart icon */}
        <Link
          to="/cart"
          className="relative text-white hover:text-yellow-400 transition-colors"
        >
          <ShoppingCartIcon className="w-8 h-8" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full px-2 text-xs font-bold">
              {cart.length}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}
