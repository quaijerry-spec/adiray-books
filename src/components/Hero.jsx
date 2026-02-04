export default function Hero() {
  return (
    <section
      className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="bg-black/60 p-8 rounded-xl text-center">
        <h1 className="text-4xl font-bold mb-4">
          Discover Your Next Great Read
        </h1>
        <p className="text-lg">
          Books that inspire, educate, and entertain
        </p>
      </div>
    </section>
  );
}
