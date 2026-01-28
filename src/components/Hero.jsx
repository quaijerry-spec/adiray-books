import React from "react";
import logo from "../../public/logo-background.png"; // optional

export default function Hero() {
  return (
    <section style={{ backgroundImage: `url('/logo-background.png')` }}>
      <h1>Welcome to AdiRay Books</h1>
    </section>
  );
}
