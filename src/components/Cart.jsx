import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <p className="text-center mt-20 text-xl">
        Your cart is empty 🛒
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-16 p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 border-b py-4"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-28 object-cover rounded"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.title}</h3>
            <p>${item.price} × {item.qty}</p>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 font-semibold"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 text-right">
        <p className="text-xl font-bold">
          Total: ${totalPrice}
        </p>

        <button
          onClick={clearCart}
          className="mt-4 bg-black text-white px-6 py-2 rounded-full"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
