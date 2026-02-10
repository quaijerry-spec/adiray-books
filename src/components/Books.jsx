import "./Books.css";

const books = [
  { id: 1, title: "AdiRay Book One", price: "$10", image: "/book1.jpg" },
  { id: 2, title: "AdiRay Book Two", price: "$12", image: "/book2.jpg" },
  { id: 3, title: "AdiRay Book Three", price: "$15", image: "/book3.jpg" },
  { id: 4, title: "AdiRay Book Four", price: "$9", image: "/book4.jpg" },
  { id: 5, title: "AdiRay Book Five", price: "$11", image: "/book5.jpg" },
];

export default function Books() {
  return (
    <section className="books-section">
      <h2 className="books-title">Available Books</h2>

      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p className="price">{book.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}
