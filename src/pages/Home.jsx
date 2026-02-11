import Hero from "../components/Hero";
import Books from "../components/Books";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* Header with Cart button */}
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
          }}
        >
          🛒 Cart
        </Link>
      </header>

      {/* Main content */}
      <Hero />
      <Books />
    </>
  );
}
