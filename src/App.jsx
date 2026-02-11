import { CartProvider } from "./context/CartContext"; // adjust path if needed
import Home from "./pages/Home";
function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}

export default App;
