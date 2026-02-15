import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";


export default function Navbar() {
   ...
   return ( ... );
}  const { cartCount } = useCart();
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
    className={`fixed left-0 right-0 flex justify-center z-50 transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${
      scrolled ? "top-3" : "top-6"
    }`}
  >
    <nav
      className={`w-[95%] max-w-6xl rounded-2xl border backdrop-blur-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${
        scrolled
          ? "bg-black/70 border-white/10 shadow-2xl px-6 py-2"
          : "bg-white/10 border-white/20 px-8 py-4"
      }`}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className="group flex items-center gap-3 relative">
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

          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* RIGHT ICONS (Mobile visible) */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/account" className="text-white">
            👤
          </Link>

          <Link to="/cart" className="relative text-white">
            <ShoppingCartIcon className="w-7 h-7" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 rounded-full animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 px-5 py-2 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/30 transition-all duration-300"
      />

      {/* RIGHT SIDE (Desktop Only) */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/account"
          className="text-white hover:text-yellow-400 transition"
        >
          Account
        </Link>

        <Link to="/cart" className="relative text-white">
          <ShoppingCartIcon className="w-7 h-7 hover:scale-110 transition-transform duration-300" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 rounded-full animate-pulse">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  </div>
  );
}
