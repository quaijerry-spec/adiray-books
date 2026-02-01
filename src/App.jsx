import books from "./books";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero */}
      <section className="text-center py-16 bg-orange-500 text-white">
        <img
          src="/logo-background.png"
          alt="AdiRay Books Logo"
          className="w-48 mx-auto mb-6 rounded-lg shadow-lg"
        />
        <h1 className="text-4xl font-bold mb-2">Welcome to AdiRay Books</h1>
        <p className="mb-4">Discover powerful books that educate, inspire, and transform lives.</p>
      </section>

      {/* Featured Books */}
      <section id="books" className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 shadow hover:shadow-lg">
              <div className="h-48 bg-gray-200 mb-4 flex items-center justify-center">
                <img src={book.image} alt={book.title} className="h-full object-contain"/>
              </div>
              <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
              <p className="mb-1">Author: {book.author}</p>
              <p className="mb-3">Price: ${book.price}</p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-orange-400 text-center py-6 mt-12">
        © {new Date().getFullYear()} AdiRay Books
      </footer>
    </div>
  );
}
