import books from "../books";
import { useCart } from "../context/CartContext";

export default function Books({ search }) {
  const { addToCart } = useCart();

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredBooks.map((book) => (
        <div key={book.id} className="bg-white shadow rounded p-4 flex flex-col">
          <img
            src={book.image}
            alt={book.title}
            className="h-48 object-contain mb-4"
          />
          <h3 className="font-semibold mb-2">{book.title}</h3>
          <p className="text-yellow-600 font-bold mb-2">${book.price}</p>
          <button
            onClick={() => addToCart(book)}
            className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
