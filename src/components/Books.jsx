import React from "react";
import books from "../books";

const Books = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">AdiRay Books</h1>
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
  );
};

export default Books;
