import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const cartData = useCart() || {};
  const cartCount = cartData.cartCount || 0;

  return (
    <div className="fixed top-6 left-0 right-0 flex justify-center z-50">
      <nav className="w-[92%] max-w-5xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-10 py-4 flex items-center justify-between shadow-2xl">

        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" className="w-10 h-10 rounded" />
          <span className="text-yellow-400 font-extrabold text-xl tracking-wide">
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

      </nav>
    </div>
  );
}
