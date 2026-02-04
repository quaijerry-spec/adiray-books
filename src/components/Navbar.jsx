import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Navbar({ onCartClick, onSearch }) {
  const { cart } = useCart();

  return (
    <nav className="bg-black text-white px-6 py-4 flex flex-col md:flex-row gap-4 md:gap-0 md:items-center md:justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src="/logo.png" className="h-10" />
        <span className="font-bold text-lg">AdiRay Books</span>
      </div>

      <motion.input
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        type="text"
        placeholder="Search books..."
        onChange={(e) => onSearch(e.target.value)}
        className="px-4 py-2 rounded-full text-black w-full md:w-64"
      />

      <button onClick={onCartClick} className="relative text-2xl">
        🛒
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 rounded-full">
            {cart.length}
          </span>
        )}
      </button>
    </nav>
  );
}
