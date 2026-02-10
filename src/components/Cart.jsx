export default function Cart({ cart, removeFromCart }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Cart</h2>

      {cart.length === 0 && <p>No items yet</p>}

      {cart.map((item, index) => (
        <div key={index}>
          {item.title} — ${item.price}
          <button onClick={() => removeFromCart(index)}>❌</button>
        </div>
      ))}
    </div>
  );
}
