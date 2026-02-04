import books from "../books";
import { useCart } from "../context/CartContext";

export default function Books({ search }) {
  const { addToCart } = useCart();

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Available Books
      </h2>

      {/* 
        GRID = books appear horizontally
        PAGE scrolls vertically naturally
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            <img
              src={book.image}
              alt={book.title}
              className="h-48 w-full object-contain p-4"
            />

            <div className="px-4 pb-4 flex flex-col flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">
                {book.title}
              </h3>

              <p className="text-yellow-500 font-bold mb-3">
                ${book.price}
              </p>

              <button
                onClick={() => addToCart(book)}
                className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-full"
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
