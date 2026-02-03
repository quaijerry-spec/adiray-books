import React from "react";
import books from "../books";
import { useCart } from "../context/CartContext";

const Books = () => {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AdiRay Books
      </h1>
      <h2 className="text-3xl font-serif font-bold text-center mb-10">
  Our Collection
</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-40 h-56 object-cover mb-4"
            />

            <h2 className="font-semibold text-center">
              {book.title}
            </h2>

            <p className="mt-2 text-blue-600 font-medium">
              ${book.price}
            </p>

            <button
              onClick={() => addToCart(book)}
              className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
