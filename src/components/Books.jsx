import books from "../books";
import { useCart } from "../context/CartContext";

export default function Books() {
  const { addToCart } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Our Book Collection
      </h2>

      {/* GRID = horizontal books, vertical scrolling */}
      <div className="grid gap-8 
                      grid-cols-2 
                      sm:grid-cols-3 
                      md:grid-cols-4 
                      lg:grid-cols-5">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={book.image}
              alt={book.title}
              className="h-56 w-full object-cover rounded-t-lg"
            />

            <div className="p-4 text-center">
              <h3 className="text-sm font-semibold leading-tight">
                {book.title}
              </h3>

              <p className="text-gray-600 mt-1">${book.price}</p>

              <button
                onClick={() => addToCart(book)}
                className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
