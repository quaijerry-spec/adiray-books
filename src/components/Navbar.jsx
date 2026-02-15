import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar({ search, setSearch }) {
  const cartData = useCart() || {};
  const cartCount = cartData.cartCount || 0;

  return (
    <div className="fixed top-6 left-0 right-0 flex justify-center z-50">
      <nav className="w-[95%] max-w-6xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-2xl">

  {/* Top Row (Logo + Cart) */}
  <div className="flex items-center justify-between w-full md:w-auto">
    <Link to="/" className="flex items-center gap-3">
      <img src="/logo.png" className="w-10 h-10 rounded" />
      <span className="text-yellow-400 font-extrabold text-lg">
        AdiRay Books
      </span>
    </Link>

    <Link to="/cart" className="relative text-white">
      <ShoppingCartIcon className="w-7 h-7" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 rounded-full">
          {cartCount}
        </span>
      )}
    </Link>
  </div>

  {/* Search */}
  <input
    type="text"
    placeholder="Search books..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full md:w-96 px-5 py-2 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
  />

</nav>
    </div>
  );
}
