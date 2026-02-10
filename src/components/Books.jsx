import "./Books.css";
import books from "../data/books"; // We'll store your 71 books in data/books.js
import { motion } from "framer-motion";

export default function Books() {
  return (
    <section className="books-section">
      <h2 className="books-title">Available Books</h2>
      <div className="books-grid">
        {books.map((book) => (
          <motion.div
            className="book-card"
            key={book.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>${book.price}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
