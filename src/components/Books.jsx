import { useCart } from "../context/CartContext";
import { useState } from "react";
import books from "../data/books";
import "./Books.css";

const getCategory = (title) => {
  const t = title.toLowerCase();

  if (t.includes("habit") || t.includes("mind") || t.includes("stoic")) return "Self-Help";
  if (t.includes("business") || t.includes("strategy") || t.includes("startup")) return "Business";
  if (t.includes("rich") || t.includes("money") || t.includes("wealth")) return "Finance";
  if (t.includes("power") || t.includes("war") || t.includes("law")) return "Psychology";
  if (t.includes("love") || t.includes("life") || t.includes("meaning")) return "Philosophy";
  if (t.includes("club") || t.includes("alchemist") || t.includes("coffee")) return "Fiction";

  return "Other";
};

export default function Books() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { addToCart } = useCart();
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || getCategory(book.title) === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="books-section">
      <h2 className="books-title">Available Books</h2>

      {/* CONTROLS */}
      <div className="books-controls">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Business">Business</option>
          <option value="Self-Help">Self-Help</option>
          <option value="Finance">Finance</option>
          <option value="Psychology">Psychology</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Fiction">Fiction</option>
          <option value="Other">Other</option>
        </select>
      </div>

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
             <button onClick={() => addToCart(book)}>
  Add to Cart
</button> 
            </div>
          ))
        )}
      </div>
    </section>
  );
}
