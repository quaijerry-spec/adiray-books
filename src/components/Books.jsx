import books from "../books";
import { useCart } from "../context/CartContext";

export default function Books({ search }) {
  const { addToCart } = useCart();

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex gap-6 overflow-x-auto pb-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="min-w-[200px] bg-white text-black rounded-xl shadow-lg p-4"
          >
            <img
              src={book.image}
              alt={book.title}
              className="h-48 w-full object-cover rounded"
            />

            <h3 className="mt-3 font-bold text-sm">
              {book.title}
            </h3>

            <p className="mt-1 font-semibold">${book.price}</p>

            <button
              onClick={() => addToCart(book)}
              className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
