import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 0),
        0
      )
    : 0;

  return (
    <div className="pt-32 min-h-screen bg-gray-100 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

        {(!cartItems || cartItems.length === 0) ? (
          <p className="text-gray-500 text-lg">
            Your cart is empty. Start adding some books 📚
          </p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-500">${item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    −
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex justify-between items-center">
              <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Clear Cart
                </button>

                <Link
                  to="/checkout"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
