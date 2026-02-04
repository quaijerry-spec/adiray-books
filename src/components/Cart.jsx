import { useCart } from "../context/CartContext";

export default function Cart({ onClose }) {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-80 p-6 h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {cart.length === 0 && <p>No items yet.</p>}

        {cart.map((item, i) => (
          <div key={i} className="flex justify-between mb-3">
            <span>{item.title}</span>
            <button
              onClick={() => removeFromCart(i)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-black text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
