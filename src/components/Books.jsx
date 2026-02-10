import "./Books.css";
import books from "../data/books";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Books() {
  return (
    <section className="books-section">
      <h2>Available Books</h2>

      <div className="books-grid">
        {books.map((book) => (
          <motion.div
            key={book.id}
            className="book-card"
            whileHover={{ scale: 1.05 }}
          >
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>${book.price}</p>

            <Link to="/checkout">
              <button>Buy Now</button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
