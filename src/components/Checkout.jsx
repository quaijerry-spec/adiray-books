export default function Checkout({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout</h2>
      <p>Total: ${total}</p>

      <button disabled>
        Pay with Stripe (Coming Soon)
      </button>

      <button disabled>
        Pay with PayPal (Coming Soon)
      </button>
    </div>
  );
}
