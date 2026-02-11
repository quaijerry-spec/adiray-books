// src/App.jsx
import React from "react";
import { CartProvider } from "./context/CartContext"; // make sure the path is correct
import Home from "./pages/Home";

function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}

export default App;
