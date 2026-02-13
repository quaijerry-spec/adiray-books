import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="pt-32 min-h-screen bg-gray-100 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

        {/* EMPTY CART MESSAGE */}
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-lg">
            Your cart is empty. Start adding some books 📚
          </p>
        ) : (
          <>
            {/* CART ITEMS */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-500">
                    ${item.price} × {item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold">
                    ${item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* TOTAL */}
            <div className="mt-6 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                Total: ${totalPrice}
              </h3>

              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
