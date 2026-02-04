import { useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Cart from "./components/Cart";
import CartProvider from "./context/CartContext";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CartProvider>
      <Navbar onSearch={setSearchQuery} />
      {showCart && <Cart />}
      <Hero />
      <Books searchQuery={searchQuery} />
    </CartProvider>
  );
}
