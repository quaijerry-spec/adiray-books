import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Your Cart is Empty 🛒</h2>
        <Link to="/">Go back to shop</Link>
      </div>
    );
  }

  return (
    <section style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          <div>
            <h3>{item.title}</h3>
            <p>${item.price}</p>
          </div>

          <div>
            <button
              onClick={() =>
                updateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
            >
              -
            </button>

            <span style={{ margin: "0 10px" }}>{item.quantity}</span>

            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
          </div>

          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h3 style={{ textAlign: "right" }}>Total: ${total.toFixed(2)}</h3>

      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#2c5364",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Checkout
      </button>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Link to="/">Continue Shopping 📚</Link>
      </div>
    </section>
  );
}
