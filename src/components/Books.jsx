import React from "react";
import books from "../books";

export default function Books() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto max-h-[70vh]">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={book.image}
            alt={book.title}
            className="w-40 h-56 object-cover mb-4"
          />
          <h2 className="font-semibold text-lg text-center">{book.title}</h2>
          <p className="mt-2 text-blue-600 font-medium">${book.price}</p>
          {/* Add to cart button */}
          <button className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
