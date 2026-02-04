export default function Hero() {
  return (
    <section
      className="relative h-[60vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to AdiRay Books
        </h1>
        <p className="max-w-xl mx-auto text-lg text-gray-200">
          Discover powerful books on mindset, business, growth, and life.
        </p>
      </div>
    </section>
  );
}
