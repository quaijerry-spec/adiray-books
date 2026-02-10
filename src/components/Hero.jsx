import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-overlay">
        <motion.img
          src="/logo.png"
          alt="AdiRay Books"
          className="hero-logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          AdiRay Books
        </motion.h1>

        <p>Knowledge that transforms your life</p>
      </div>
    </div>
  );
}
