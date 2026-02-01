export default function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to AdiRay Books 📚</h1>

      <p>
        Your online bookstore for inspiring and educational books.
      </p>

      <h2>Featured Books</h2>
      <ul>
        <li>Book One — SSP 5,000</li>
        <li>Book Two — SSP 7,000</li>
        <li>Book Three — SSP 6,000</li>
      </ul>

      <p style={{ marginTop: "40px" }}>
        © {new Date().getFullYear()} AdiRay Books
      </p>
    </div>
  );
}
