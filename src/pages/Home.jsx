import books from "../books";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Home({ search }) {
  const { addToCart } = useCart();

  const normalize = (str) =>
  (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "");

  const [scrollY, setScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  
  const filteredBooks = (books || []).filter((book) =>
    normalize(book.title).includes(normalize(search))
  );

  return (
  <div className="pt-36 md:pt-40 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">

      {/* HERO SECTION */}
      <section
  className="relative h-[85vh] bg-cover bg-center flex items-center"
  style={{
    backgroundImage: "url('/hero-bg.jpg')",
    backgroundPositionY: `${scrollY * 0.5}px`
  }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

  <div
  className="relative z-10 max-w-5xl mx-auto px-6 text-white transition-all duration-300"
  style={{
  opacity: Math.max(1 - scrollY / 400, 0),
  transform: `translateY(-${scrollY / 6}px)`
}}
>
    <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6">
      Discover Books That <br />
      <span className="text-yellow-400">Shape Your Future</span>
    </h1>

    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
      Curated knowledge. Timeless stories. Personal growth.
      Elevate your mind with every page.
    </p>

    <button className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition duration-300 shadow-lg">
      Explore Collection
    </button>
  </div>
</section>

      {/* COLLECTION SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold mb-12 text-gray-800">
  Featured Collection
</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div
  key={book.id}
  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 opacity-0 animate-fadeInUp"
>
  <div className="overflow-hidden">
    <img
      src={book.image}
      alt={book.title}
      className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
    />
  </div>

  <div className="p-6">
    <h3 className="font-semibold text-lg mb-2 text-gray-800">
      {book.title}
    </h3>

    <p className="text-or-yellow-500 font-bold text-xl mb-4">
      ${book.price}
    </p>

    <button
      onClick={() => addToCart(book)}
      className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-3 rounded-full hover:scale-105 transition duration-300"
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
