import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <div className="relative bg-black w-full h-screen flex items-center justify-center  flex-col overflow-hidden to-black shadow-2xl">
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 "
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Glow ring */}
      <motion.div
        className="absolute w-[150px] h-[150px] rounded-full bg-gradient-to-tr from-purple-900/90 to-pink-900/70 blur-3xl"
    
      />

      {/* Main text */}
      <motion.h1
        className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-bold tracking-widest bg-gradient-to-r from-gray-200 via-white to-gray-400 bg-clip-text text-transparent drop-shadow-lg"
      >
        COMING SOON
      </motion.h1>

      {/* Sub-text */}
      <motion.p

        className="  text-neutral-400 mt-6 text-sm sm:text-base font-light tracking-wider"
      >
        Stay tuned for something epic ✨
      </motion.p>
    </div>
  );
}
