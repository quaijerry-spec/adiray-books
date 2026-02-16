import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ search, setSearch }) {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const AccountIcon = (
    <div className="relative">
      <UserIcon
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-7 h-7 text-white cursor-pointer hover:scale-110 transition-transform duration-300"
      />

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl overflow-hidden z-50"
          >
            {!user ? (
              <Link
                to="/login"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/account"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>

                <Link
                  to="/orders"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Orders
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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
              className={`text-orange-500 font-extrabold transition-all duration-500 ${
                scrolled ? "text-base" : "text-lg"
              }`}
            >
              AdiRay Books
            </span>
          </Link>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/cart" className="relative text-white">
              <ShoppingCartIcon className="w-7 h-7" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-400 text-black text-xs px-2 rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
            {AccountIcon}
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-5 py-2 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white/30 transition-all duration-300"
        />

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/cart" className="relative text-white">
            <ShoppingCartIcon className="w-7 h-7 hover:scale-110 transition-transform duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-400 text-black text-xs px-2 rounded-full animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
          {AccountIcon}
        </div>
      </nav>
    </div>
  );
}
