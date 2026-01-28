import React from "react";

const books = [
  { title: "The Way of the Superior Man", author: "David Deida", price: 15, genre: "Self-help" },
  { title: "The 50th Law", author: "50 Cent & Robert Greene", price: 13, genre: "Biography" }
];

export default function FeaturedBooks() {
  return (
    <section>
      <h2>Featured Books</h2>
      <div>
        {books.map((book, idx) => (
          <div key={idx}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <p>Genre: {book.genre}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
