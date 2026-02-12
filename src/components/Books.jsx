import { useCart } from "../context/CartContext";
import books from "../data/books";

export default function Books({ search }) {
  const { addToCart } = useCart();

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">Our Collection</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={book.image}
              alt={book.title}
              className="h-60 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {book.title}
              </h3>

              <p className="text-yellow-500 font-bold mb-4">
                ${book.price}
              </p>

              <button
                onClick={() => addToCart(book)}
                className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <p className="mt-10 text-gray-500 text-center">
          No books found.
        </p>
      )}
    </section>
  );
}
