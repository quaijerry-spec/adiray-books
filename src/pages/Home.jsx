import Hero from "../components/Hero";
import Books from "../components/Books";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Cart Link */}
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <Link to="/cart">Go to Cart 🛒</Link>
      </div>

      <Books />
    </>
  );
}
