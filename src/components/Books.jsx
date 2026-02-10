import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Books.css";

const books = [
  { id: 1, title: "Book One", price: 10, image: "/book1.jpg" },
  { id: 2, title: "Book Two", price: 12, image: "/book2.jpg" },
  { id: 3, title: "Book Three", price: 15, image: "/book3.jpg" },
  { id: 4, title: "Book Four", price: 9, image: "/book4.jpg" },
  { id: 5, title: "Book Five", price: 11, image: "/book5.jpg" },
  { id: 6, title: "Book Six", price: 14, image: "/book6.jpg" },
];

export default function Books() {
  const navigate = useNavigate();

  return (
    <section className="books-section">
      <h2>Available Books</h2>

      <div className="books-grid">
        {books.map((book) => (
          <motion.div
            className="book-card"
            key={book.id}
            whileHover={{ scale: 1.05 }}
          >
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p className="price">${book.price}</p>
            <button onClick={() => navigate("/checkout")}>
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
