import books from "../books";
import { useCart } from "../context/CartContext";

export default function Books() {
  const { addToCart } = useCart();

  return (
    <section className="bg-[#0b0b0b] text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6">Available Books</h2>

        {/* GRID — horizontal cards, vertical scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-[#111] rounded-xl p-4 hover:scale-105 transition"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-56 object-cover rounded-md mb-3"
              />

              <h3 className="text-sm font-semibold leading-tight">
                {book.title}
              </h3>

              <p className="text-yellow-400 font-bold mt-1">
                ${book.price}
              </p>

              <button
                onClick={() => addToCart(book)}
                className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-full text-sm font-medium"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
