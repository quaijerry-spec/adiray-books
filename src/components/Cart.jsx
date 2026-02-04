import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, book) => acc + book.price, 0);

  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-gray-900 text-white shadow-xl p-6 overflow-y-auto z-50">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((book, index) => (
            <div key={index} className="flex justify-between items-center mb-3">
              <div>
                <p className="font-semibold">{book.title}</p>
                <p className="text-yellow-400">${book.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(book.id)}
                className="text-red-500 font-bold"
              >
                X
              </button>
            </div>
          ))}
          <hr className="my-4 border-gray-700" />
          <p className="font-bold text-lg">Total: ${total}</p>
          <button
            onClick={clearCart}
            className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-full text-sm font-medium"
          >
            Clear Cart
          </button>
        </>
      )}
    </aside>
  );
}
