import React from "react";
import heroImage from "../assets/hero.jpg"; // make sure hero.jpg exists

export default function Hero() {
  return (
    <div
      className="w-full h-96 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <h1 className="text-5xl text-white font-bold bg-black bg-opacity-50 p-4 rounded">
        Welcome to AdiRay Books
      </h1>
    </div>
  );
}
