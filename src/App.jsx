import Books from "./components/Books";

function App() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* NAVBAR */}
      <nav className="max-w-6xl mx-auto mt-6 bg-gray-700 rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="AdiRay Books" className="h-8" />
          <span className="text-yellow-400 font-semibold text-lg">
            AdiRay Books
          </span>
        </div>

        <div className="flex gap-4 text-white">
          <span>🛒</span>
          <span>👤</span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        className="relative mt-6 h-[420px] bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
          <div className="text-white max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Read Learn Grow
            </h1>

            <p className="text-gray-200 mb-6">
              Discover your next great read from our curated collection of
              books on personal development, business, and success.
            </p>

            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-full transition">
              Browse Books
            </button>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Our Collection
        </h2>

        <Books />
      </section>

    </div>
  );
}

export default App;
