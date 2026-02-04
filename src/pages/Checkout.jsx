import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart } = useCart();

  const total = cart.reduce((sum, b) => sum + b.price, 0);

  const payWithStripe = () => {
    window.location.href = "https://buy.stripe.com/test_4gw9E8example";
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-10 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.map((b, i) => (
        <div key={i} className="flex justify-between mb-2">
          <span>{b.title}</span>
          <span>${b.price}</span>
        </div>
      ))}

      <hr className="my-4" />
      <p className="font-bold mb-4">Total: ${total}</p>

      <button
        onClick={payWithStripe}
        className="w-full bg-black text-white py-3 rounded mb-3"
      >
        Pay with Stripe
      </button>

      <button
        className="w-full bg-blue-600 text-white py-3 rounded"
      >
        Pay with PayPal (coming soon)
      </button>
    </div>
  );
      }
