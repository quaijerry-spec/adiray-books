import React from "react";
import heroImage from "../assets/hero.jpg"; // replace with your hero image path

export default function Hero() {
  return (
    <div
      className="w-full h-96 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
        Welcome to AdiRay Books
      </h1>
    </div>
  );
}
