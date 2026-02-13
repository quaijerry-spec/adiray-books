import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Order placed successfully! 🎉");
    clearCart();
  };

  return (
    <div className="pt-32 min-h-screen bg-gray-100 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>

        <p className="mb-4">Total Amount: <strong>${totalPrice}</strong></p>

        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
