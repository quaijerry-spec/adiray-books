export default function Hero() {
  return (
    <section
      className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/hero-bg.png)" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <img
          src="/logo.png"
          alt="AdiRay Books Logo"
          className="mx-auto mb-6 w-44 drop-shadow-xl"
        />

        <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 tracking-wide">
          AdiRay Books
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl mx-auto">
          Discover powerful books on growth, mindset, business, and life.
        </p>

        <button
          className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition"
          onClick={() =>
            document
              .getElementById("books-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Browse Books
        </button>
      </div>
    </section>
  );
}
