export default function Cart() {
  const cart = useCart();

  console.log("Cart data:", cart);

  return (
    <div className="pt-32">
      <h1>Cart Page Test</h1>
    </div>
  );
}
