import Hero from "../components/Hero";
import Books from "../components/Books";
import { Link } from "react-router-dom";
<Link to="/cart">Go to Cart 🛒</Link>

export default function Home() {
  return (
    <>
      <Hero />
      <Books />
    </>
  );
}
