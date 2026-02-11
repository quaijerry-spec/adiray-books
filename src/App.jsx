import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Books from "./Books";
import Checkout from "./Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
