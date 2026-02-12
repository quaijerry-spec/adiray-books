import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar({ search, setSearch }) {
  const { cart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-[#2c5364] py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo on the left */}
        <Link to="/" className="flex items-center text-white font-bold text-xl">
          <img src="/logo.png" alt="AdiRay Books" className="w-12 h-12 mr-2" />
          AdiRay Books
        </Link>

        {/* Search bar in the middle */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="🔍 Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
          />
        </div>

        {/* Cart on the right */}
        <Link
          to="/cart"
          className="text-white font-medium hover:text-yellow-400 transition-colors"
        >
          Cart ({cart.length})
        </Link>
      </div>
    </nav>
  );
}
