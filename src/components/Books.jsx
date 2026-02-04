import books from "../books";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Books({ search }) {
  const { addToCart } = useCart();

  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((book) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="flex bg-white rounded-xl shadow p-4"
          >
            <img
              src={book.image}
              className="w-28 h-36 object-contain mr-4"
            />

            <div className="flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-yellow-500 font-bold">${book.price}</p>
              </div>

              <button
                onClick={() => addToCart(book)}
                className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-full font-semibold w-fit"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
