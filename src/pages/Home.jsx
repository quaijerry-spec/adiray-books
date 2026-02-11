import Hero from "../components/Hero";
import Books from "../components/Books";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
        <Link to="/cart" style={{ textDecoration: "none" }}>
          🛒 Cart {totalItems > 0 && `(${totalItems})`}
        </Link>
      </header>

      <Hero />
      <Books />
    </>
  );
}
