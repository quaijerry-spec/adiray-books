import { useCart } from "../context/CartContext";

export default function Cart({ setShowCart }) {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, book) => acc + book.price * book.quantity, 0);

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-gray-100 shadow-lg p-6 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={() => setShowCart(false)} className="text-xl">✕</button>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((book) => (
              <div key={book.id} className="flex items-center justify-between bg-white p-2 rounded shadow">
                <div>
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-yellow-600">${book.price}</p>
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
            <p className="font-bold">Total: ${total}</p>
            <button
              onClick={clearCart}
              className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded"
            >
              Clear Cart
            </button>
            <button
              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
