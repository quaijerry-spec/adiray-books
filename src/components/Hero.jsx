export default function Hero() {
  return (
    <section
      style={{
        minHeight: "60vh",
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <img src="/logo.png" alt="AdiRay Books" style={{ width: 120 }} />
      <h1>AdiRay Books</h1>
      <p>Knowledge that changes lives</p>
    </section>
  );
}
