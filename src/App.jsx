import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Books from "./components/Books";
import Cart from "./components/Cart";

export default function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Navbar toggleCart={() => setShowCart(!showCart)} />
      <Hero />
      {showCart ? <Cart /> : <Books />}
    </>
  );
}
