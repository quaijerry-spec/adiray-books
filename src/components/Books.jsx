import React from "react";
import books from "../books";
import { useCart } from "../context/CartContext";

export default function Books() {
  const { addToCart } = useCart();

  return (
    <div className="p-6 flex flex-col overflow-y-auto gap-4 max-h-[calc(100vh-64px)]">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex items-center gap-4 bg-white p-4 rounded shadow hover:shadow-lg"
        >
          <img
            src={book.image}
            alt={book.title}
            className="w-24 h-36 object-cover"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-lg">{book.title}</h2>
            <p className="text-blue-600 font-medium">${book.price}</p>
            <button
              onClick={() => addToCart(book)}
              className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
