import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <div className="fixed top-6 left-0 right-0 flex justify-center z-50">
      <nav className="w-[90%] max-w-4xl bg-gray-700 rounded-full px-8 py-4 flex items-center justify-between shadow-xl">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" className="w-10 h-10 rounded" />
          <span className="text-yellow-400 font-bold text-lg">
            AdiRay Books
          </span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative text-white">
          <ShoppingCartIcon className="w-7 h-7" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

      </nav>
    </div>
  );
}
