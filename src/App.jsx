import { useState } from "react";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Cart from "./components/Cart";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar
        onToggleCart={() => setShowCart(!showCart)}
        onSearch={setSearch}
      />

      {showCart && <Cart onClose={() => setShowCart(false)} />}

      <Books search={search} />
    </div>
  );
}
