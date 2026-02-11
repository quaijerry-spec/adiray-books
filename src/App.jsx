import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </CartProvider>
  );
}
