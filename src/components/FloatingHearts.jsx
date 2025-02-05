import { motion } from "framer-motion";

function FloatingHeart({ delay }) {
  return (
    <motion.div
      initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
      animate={{ y: -100 }}
      transition={{
        duration: 10,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      }}
      className="absolute text-4xl"
    >
      ❤️
    </motion.div>
  );
}

function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(20)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 0.5} />
      ))}
    </div>
  );
}

export default FloatingHearts;
