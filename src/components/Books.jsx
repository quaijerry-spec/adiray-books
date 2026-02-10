import { useState } from "react";
import books from "../data/books"; // your 71 books file
import "./Books.css";

export default function Books() {
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="books-section">
      <h2 className="books-title">Available Books</h2>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search books..."
        className="books-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* BOOK GRID */}
      <div className="books-grid">
        {filteredBooks.length === 0 ? (
          <p className="no-results">No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p className="price">${book.price}</p>
              <button>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
