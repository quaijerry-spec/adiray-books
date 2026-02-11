import Hero from "../components/Hero";
import Books from "../components/Books";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Cart header */}
      <header style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "20px",
        backgroundColor: "#2c5364",
      }}>
        <Link
          to="/cart"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
            backgroundColor: "#203a43",
            padding: "10px 15px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          🛒 Cart
          {totalItems > 0 && (
            <span style={{
              marginLeft: "8px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 8px",
              fontSize: "14px",
              fontWeight: "bold",
            }}>
              {totalItems}
            </span>
          )}
        </Link>
      </header>

      <Hero />
      <Books />
    </>
  );
}
