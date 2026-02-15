import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Navbar({ search, setSearch }) {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 flex justify-center z-50 transition-all duration-500 ${
        scrolled ? "top-3" : "top-6"
      }`}
    >
      <nav
        className={`w-[95%] max-w-6xl rounded-2xl border backdrop-blur-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 border-white/10 shadow-2xl px-6 py-2"
            : "bg-white/10 border-white/20 px-8 py-4"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              className={`rounded transition-all duration-500 ${
                scrolled ? "w-8 h-8" : "w-10 h-10"
              }`}
              alt="Logo"
            />
            <span
              className={`text-yellow-500 font-extrabold transition-all duration-500 ${
                scrolled ? "text-base" : "text-lg"
              }`}
            >
              AdiRay Books
            </span>
          </Link>

          {/* Mobile Cart & Account */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/cart" className="relative text-white">
              <ShoppingCartIcon className="w-7 h-7" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="text-white">
              <UserIcon className="w-7 h-7 hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-5 py-2 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/30 transition-all duration-300"
        />

        {/* Desktop Cart & Account */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/cart" className="relative text-white">
            <ShoppingCartIcon className="w-7 h-7 hover:scale-110 transition-transform duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 rounded-full animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/account" className="text-white">
            <UserIcon className="w-7 h-7 hover:scale-110 transition-transform duration-300" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
