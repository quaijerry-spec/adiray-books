import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
    : 0;

  const handleCheckout = () => {
    alert("Thank you for your purchase! 🎉");
    clearCart();
  };

  return (
    <div className="pt-32 min-h-screen bg-gray-100 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>

        {(!cartItems || cartItems.length === 0) ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mb-6">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between py-2 border-b">
                  <span>{item.title} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</h3>

            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition"
            >
              Complete Purchase
            </button>

            <Link to="/cart" className="ml-4 text-blue-500 underline">
              Back to Cart
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
