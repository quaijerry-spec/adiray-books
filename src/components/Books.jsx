import "./Books.css";

const books = [
  {
    id: 1,
    title: "The Power of Knowledge",
    price: "$10",
    image: "/book1.jpg",
  },
  {
    id: 2,
    title: "Mindset for Success",
    price: "$12",
    image: "/book2.jpg",
  },
  {
    id: 3,
    title: "Leadership Wisdom",
    price: "$15",
    image: "/book3.jpg",
  },
  {
    id: 4,
    title: "Faith & Growth",
    price: "$9",
    image: "/book4.jpg",
  },
  {
    id: 5,
    title: "Business Strategy 101",
    price: "$11",
    image: "/book5.jpg",
  },
  {
    id: 6,
    title: "Self-Discipline Guide",
    price: "$14",
    image: "/book6.jpg",
  },
];

export default function Books() {
  return (
    <section className="books-section">
      <h2 className="books-title">Available Books</h2>

      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <img
              src={book.image}
              alt={book.title}
              className="book-image"
            />

            <h3 className="book-title">{book.title}</h3>
            <p className="book-price">{book.price}</p>

            <button className="book-button">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
