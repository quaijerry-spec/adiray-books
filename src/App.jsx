import { useState } from "react";
import Books from "./components/Books";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Admin from "./components/Admin";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Books from "./components/Books";
import Checkout from "./pages/Checkout";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, book]);
  }

  function removeFromCart(index) {
    setCart(cart.filter((_, i) => i !== index));
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>AdiRay Books</h1>

      <Books addToCart={addToCart} />
      <Cart cart={cart} removeFromCart={removeFromCart} />
      <Checkout cart={cart} />
      <Admin />
    </>
  );
}
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Hero />
            <Books />
          </>
        }
      />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
