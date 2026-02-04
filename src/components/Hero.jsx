export default function Hero() {
  return (
    <section
      className="h-[320px] bg-cover bg-center relative"
      style={{ backgroundImage: "url(/hero.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Discover Your Next Book
          </h2>
          <p className="text-lg text-gray-200">
            Hand-picked books for curious minds
          </p>
        </div>
      </div>
    </section>
  );
}
