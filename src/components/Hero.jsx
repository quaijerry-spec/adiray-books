export default function Hero() {
  return (
    <section
      className="w-full h-[500px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
        Welcome to AdiRay Books
      </h1>
    </section>
  );
}
