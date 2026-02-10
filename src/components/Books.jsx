import { useState } from "react";
import "./Books.css";

const booksData = [
  { id: 1, title: "Power of Knowledge", price: 10, image: "/book1.jpg" },
  { id: 2, title: "Mindset for Success", price: 12, image: "/book2.jpg" },
  { id: 3, title: "Leadership Wisdom", price: 15, image: "/book3.jpg" },
  { id: 4, title: "Faith & Growth", price: 9, image: "/book4.jpg" },
  { id: 5, title: "Business Strategy", price: 11, image: "/book5.jpg" },
  { id: 6, title: "Self Discipline", price: 14, image: "/book6.jpg" },
];

export default function Books({ addToCart }) {
  const [search, setSearch] = useState("");

  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="books-section">
      <input
        className="search"
        placeholder="Search books..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="books-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>${book.price}</p>
            <button onClick={() => addToCart(book)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}
