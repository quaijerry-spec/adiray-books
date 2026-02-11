import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
