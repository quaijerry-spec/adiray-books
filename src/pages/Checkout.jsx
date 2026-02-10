import "./Checkout.css";
import { motion } from "framer-motion";

export default function Checkout() {
  const handleCheckout = () => {
    // 🔐 Replace this with your REAL Stripe Checkout URL
    window.location.href = "https://buy.stripe.com/test_XXXXXXXXXXXX";
  };

  return (
    <motion.div
      className="checkout-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Checkout</h1>
      <p>Secure payment powered by Stripe</p>

      <button onClick={handleCheckout} className="checkout-btn">
        Pay with Stripe
      </button>
    </motion.div>
  );
}
