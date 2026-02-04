import { useCart } from "../context/CartContext";
import logo from "../assets/logo.png";

export default function Navbar({ toggleCart }) {
  const { cart } = useCart();

  return (
    <div className="flex justify-center mt-4">
      <nav className="flex items-center justify-between w-[95%] max-w-6xl bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg">
        <div className="flex items-center gap-3">
          <img
  src="/logo.png"
  alt="AdiRay Books"
  className="h-10 w-10"
/>
          <span className="font-bold text-lg text-yellow-400">
            AdiRay Books
          </span>
        </div>

        <button
          onClick={toggleCart}
          className="relative text-xl"
        >
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
}
