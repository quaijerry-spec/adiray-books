import { useCart } from "../context/CartContext";

export default function Cart({ setShowCart }) {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, b) => sum + b.price, 0);

  return (
    <aside className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        <button onClick={() => setShowCart(false)}>✕</button>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((book) => (
              <div
                key={book.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{book.title}</p>
                  <p className="text-yellow-500">${book.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(book.id)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <p className="font-bold mb-2">Total: ${total}</p>
            <button className="w-full bg-green-600 text-white py-2 rounded mb-2">
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full bg-gray-200 py-2 rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
