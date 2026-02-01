import "./index.css";
import logo from "../public/logo-background.png";

export default function App() {
  return (
    <div className="min-h-screen bg-orange-500 text-black">
      {/* Announcement Banner */}
      <div className="bg-black text-orange-400 text-center py-2 font-semibold">
        📚 New arrivals available now — Pay with MTN MoMo or Stripe
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4">
        <img
          src={logo}
          alt="AdiRay Books Logo"
          className="w-48 mb-6 rounded-lg shadow-lg"
        />

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Read. Learn. Grow.
        </h1>

        <p className="max-w-xl mb-6 text-lg">
          Discover powerful books that educate, inspire, and transform lives.
        </p>

        <a
          href="#books"
          className="bg-black text-orange-400 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Shop Books
        </a>
      </section>

      {/* Featured Books */}
      <section id="books" className="bg-white py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Books
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["Book One", "Book Two", "Book Three"].map((book) => (
            <div
              key={book}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <div className="h-40 bg-gray-200 mb-4 flex items-center justify-center">
                📘 Book Cover
              </div>
              <h3 className="font-semibold text-lg mb-2">{book}</h3>
              <p className="mb-3">SSP 5,000</p>
              <button className="bg-orange-500 text-black px-4 py-2 rounded font-semibold hover:bg-orange-400">
                Buy with MoMo
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-orange-400 text-center py-6">
        © {new Date().getFullYear()} AdiRay Books — Read • Learn • Grow
      </footer>
    </div>
  );
}
