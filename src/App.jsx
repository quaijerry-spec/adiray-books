import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
