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
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to AdiRay Books
        </h1>
        <p className="max-w-xl mx-auto text-lg text-gray-200">
          Discover books on mindset, business, AI, and personal growth.
        </p>
      </div>
    </section>
  );
}
