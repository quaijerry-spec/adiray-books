import { useCart } from "../context/CartContext";

export default function Navbar({ setShowCart, search, setSearch }) {
  const { cart } = useCart();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white sticky top-0 z-50">
      <h1 className="text-2xl font-bold">AdiRay Books</h1>

      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-1 rounded w-1/3 text-black"
      />

      <button
        onClick={() => setShowCart(true)}
        className="relative text-2xl"
      >
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
