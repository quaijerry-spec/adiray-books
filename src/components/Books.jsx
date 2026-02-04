import { books } from "../data/books";
import { useCart } from "../context/CartContext";

export default function Books() {
  const { addToCart } = useCart();

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-serif font-bold mb-10">
        Our Collection
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {books.map((book) => (
          <div key={book.id} className="text-center">
            <img
              src={book.image}
              alt={book.title}
              className="h-60 w-full object-cover rounded-lg shadow"
            />

            <h3 className="mt-4 font-semibold">{book.title}</h3>
            <p className="text-gray-600">${book.price}</p>

            <button
              onClick={() => addToCart(book)}
              className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
