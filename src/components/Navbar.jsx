import { useCart } from "../context/CartContext";

export default function Navbar({ onToggleCart, onSearch }) {
  const { cart } = useCart();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#020617] sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-xl font-bold text-yellow-400">
          AdiRay Books
        </h1>
      </div>

      <input
        type="text"
        placeholder="Search books..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-1/2 px-4 py-2 rounded bg-gray-800 text-white outline-none"
      />

      <button onClick={onToggleCart} className="relative text-2xl">
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
