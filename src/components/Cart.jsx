import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((book, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded shadow"
            >
              <span>{book.title}</span>
              <div className="flex items-center gap-2">
                <span>${book.price}</span>
                <button
                  onClick={() => removeFromCart(book.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
