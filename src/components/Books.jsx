import books from "../books";
import { useCart } from "../context/CartContext";

export default function Books({ search = "" }) {
  const { addToCart } = useCart();

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Available Books
      </h2>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="flex bg-white rounded-xl shadow hover:shadow-md transition p-4"
          >
            {/* Image */}
            <img
              src={book.image}
              alt={book.title}
              className="w-28 h-36 object-contain mr-4"
            />

            {/* Info */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {book.title}
                </h3>

                <p className="text-yellow-500 font-bold mt-1">
                  ${book.price}
                </p>
              </div>

              <button
                onClick={() => addToCart(book)}
                className="mt-3 self-start bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full"
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
