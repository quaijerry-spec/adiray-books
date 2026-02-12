export default function Home() {
  return (
    <div className="pt-32">

      {/* HERO */}
      <section
        className="relative h-[500px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512820790803-83ca734da794')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-white">
          <h1 className="text-5xl font-bold mb-6">
            Read Learn Grow
          </h1>

          <p className="text-lg mb-8 max-w-xl">
            Discover your next great read from our curated collection of books
            on personal development, business, and success.
          </p>

          <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
            Browse Books
          </button>
        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10">Our Collection</h2>

        {/* Your books grid here */}
      </section>

    </div>
  );
}
