import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_XXXXXXXXXXXXXXXXXXXXXXXX" // replace with your Stripe public key
);

export default function Checkout() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    await stripe.redirectToCheckout({
      lineItems: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "AdiRay Book Purchase",
            },
            unit_amount: 1500,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: window.location.origin,
      cancelUrl: window.location.origin,
    });
  };

  return (
    <div style={{ padding: "80px", textAlign: "center" }}>
      <h1>Checkout</h1>
      <p>Secure payment powered by Stripe</p>
      <button onClick={handleCheckout} style={{ padding: "12px 24px" }}>
        Pay with Card
      </button>
    </div>
  );
}
