import { useCart } from "../context/CartContext";

export default function Cart() {
  const cartData = useCart();

  console.log("CART DATA:", cartData);

  return (
    <div style={{ paddingTop: "120px" }}>
      <h1>Cart Debug Mode</h1>
    </div>
  );
}
