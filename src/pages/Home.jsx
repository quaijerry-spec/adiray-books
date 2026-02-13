import { useCart } from "../context/CartContext";
import { useState } from "react";
import books from "../books";

export default function Home() {
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  
  const normalize = (str) =>
    (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "");

  const filteredBooks = books.filter((book) =>
    normalize(book.title).includes(normalize(search))
  );

  return (
    <div className="pt-32 bg-gray-100 min-h-screen">

      {/* HERO SECTION */}
      <section
        className="relative h-[500px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-white">
          <h1 className="text-5xl font-bold mb-6">Read Learn Grow</h1>
          <p className="text-lg mb-8 max-w-xl">
            Discover your next great read from our curated collection.
          </p>
        </div>
      </section>

      {/* BOOK SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Our Collection</h2>

        <input
          type="text"
          placeholder="🔍 Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-5 py-3 rounded-full shadow-sm border focus:ring-2 focus:ring-yellow-400 focus:outline-none mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
                <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                <p className="text-yellow-500 font-bold mb-4">${book.price}</p>
                <button
  onClick={() => addToCart(book)}
  className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
>
  Add to Cart
</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
              }
