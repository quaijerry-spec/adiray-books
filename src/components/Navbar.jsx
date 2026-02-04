import { useCart } from "../context/CartContext";

export default function Navbar({ setShowCart, search, setSearch }) {
  const { cart } = useCart();

  return (
    <nav className="bg-[#1f2933] text-white px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold tracking-wide text-yellow-400">
          AdiRay Books
        </h1>

        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 rounded-full text-black focus:outline-none"
        />

        <button
          onClick={() => setShowCart(true)}
          className="relative text-2xl"
        >
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 rounded-full font-bold">
              {cart.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
