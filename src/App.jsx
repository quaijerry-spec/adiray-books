import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Books from "./components/Books";
import Checkout from "./pages/Checkout";

export default function App() {
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
