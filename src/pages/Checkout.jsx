// src/pages/Checkout.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!form.name || !form.email || !form.address) {
      alert("Please fill all fields before placing your order.");
      return;
    }

    // Here you would normally send order to backend
    alert(`Thank you ${form.name}! Your order of ${cartItems.length} item(s) is placed.`);

    clearCart();
    navigate("/"); // Redirect to home after checkout
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="pt-32 min-h-screen px-6">
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>
        <p>Your cart is empty. Go back to <Link to="/" className="text-blue-500 underline">home</Link> to add items.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-gray-100 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>

        {/* Cart summary */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Order Summary:</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.title} x {item.quantity}</span>
              <span>${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-2">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout form */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Your Information:</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
        </div>

        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-6 py-3 rounded font-bold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
