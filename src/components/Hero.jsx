export default function Hero() {
  return (
    <section
      className="h-[75vh] flex items-center"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/60 w-full h-full flex items-center">
        <div className="max-w-6xl px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            Read Learn Grow
          </h1>

          <p className="mt-4 max-w-lg text-gray-200">
            Discover your next great read from our curated collection of books
            on personal development, business, and success.
          </p>

          <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-semibold">
            Browse Books
          </button>
        </div>
      </div>
    </section>
  );
}
