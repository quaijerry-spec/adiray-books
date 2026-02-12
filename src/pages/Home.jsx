import { useState } from "react";
import books from "../data/books"; // <-- import your full books array
export default function Home({ search, setSearch }) {
  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      price: 20,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    },
    {
      id: 2,
      title: "Rich Dad Poor Dad",
      price: 18,
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    },
    {
      id: 3,
      title: "The Power of Now",
      price: 22,
      image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
    },
  ];

  const [search, setSearch] = useState("");
  const filteredBooks = books.filter((book) =>
   book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-32 bg-gray-100 min-h-screen">

      {/* HERO SECTION */}
      <section
        className="relative h-[500px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-white">
          <h1 className="text-5xl font-bold mb-6">
            Read Learn Grow
          </h1>

          <p className="text-lg mb-8 max-w-xl">
            Discover your next great read from our curated collection.
          </p>

          <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
            Browse Books
          </button>
        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Our Collection</h2>

        {/* SEARCH BAR */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="🔍 Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 px-5 py-3 rounded-full shadow-sm border focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
        </div>

        {/* BOOK GRID */}
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
                <h3 className="font-semibold text-lg mb-2">
                  {book.title}
                </h3>

                <p className="text-yellow-500 font-bold mb-4">
                  ${book.price}
                </p>

                <button className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition">
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
