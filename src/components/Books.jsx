import React from "react";
import books from "../books"; // adjust path if needed
import { useCart } from "../context/CartContext";
const Books = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/logo.jpg')" }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content on top of overlay */}
      <div className="relative z-10 container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          AdiRay Books
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
