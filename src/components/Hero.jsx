import { motion } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <motion.div
        className="hero-overlay"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src="/logo.png" alt="AdiRay Books Logo" className="hero-logo" />
        <h1>AdiRay Books</h1>
        <p>Discover inspiring books for every reader</p>
      </motion.div>
    </section>
  );
}
