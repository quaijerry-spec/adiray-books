

export default function Hero() {
  return (
    <section
      className="relative h-[420px] mt-6 rounded-xl overflow-hidden max-w-6xl mx-auto"
      style={{
  backgroundImage: "url('/hero.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
}}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-10 text-white max-w-xl">
        <h1 className="text-4xl font-bold mb-4">
          Read Learn Grow
        </h1>

        <p className="text-gray-200 mb-6">
          Discover your next great read from our curated collection of books
          on personal development, business, and success.
        </p>

        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-full w-fit">
          Browse Books
        </button>
      </div>
    </section>
  );
}
