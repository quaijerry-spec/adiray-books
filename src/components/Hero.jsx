export default function Hero() {
  return (
    <section
      style={{
        minHeight: "60vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
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
