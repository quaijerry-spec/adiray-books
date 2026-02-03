import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="fixed right-4 top-24 bg-white shadow-lg rounded-lg p-4 w-64 z-50">
      <h2 className="font-bold mb-3">Cart</h2>

      {cart.length === 0 && (
        <p className="text-sm text-gray-500">Cart is empty</p>
      )}

      {cart.map((item, index) => (
        <div key={index} className="mb-2">
          <p className="text-sm font-medium">{item.title}</p>
          <p className="text-xs">${item.price}</p>

          <button
            onClick={() => removeFromCart(index)}
            className="text-red-500 text-xs"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
