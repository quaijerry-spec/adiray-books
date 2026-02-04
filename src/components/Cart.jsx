import { useCart } from "../context/CartContext";

export default function Cart({ onClose }) {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-[#020617] p-6 z-50 shadow-xl">
      <button
        onClick={onClose}
        className="text-yellow-400 mb-4"
      >
        ✕ Close
      </button>

      <h2 className="text-xl font-bold mb-4 text-white">
        Your Cart
      </h2>

      {cart.length === 0 && (
        <p className="text-gray-400">Your cart is empty</p>
      )}

      {cart.map((book) => (
        <div
          key={book.id}
          className="flex justify-between items-center mb-3 text-white"
        >
          <span className="text-sm">{book.title}</span>
          <button
            onClick={() => removeFromCart(book.id)}
            className="text-red-400 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 border-t border-gray-700 pt-4 text-white">
        <p className="font-bold">Total: ${total}</p>

        <button className="w-full mt-4 bg-yellow-500 text-black py-2 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
}
