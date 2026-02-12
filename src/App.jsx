import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Navbar /> {/* search can be handled inside Home */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </CartProvider>
  );
}
