import "../index.css";
import { motion } from "framer-motion";

export default function LandingMain() {
  const videoSource = "/Video/Product/Videoproduct2.mp4";

  return (
    <main className="w-full min-h-screen relative flex justify-center items-center overflow-hidden">
      <video
        src={videoSource}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 w-full flex justify-center items-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex-1 text-center w-full max-w-3xl">
          <motion.h1
            className="text-4xl md:text-6xl font-serif text-white drop-shadow-lg leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            In every whisked cup of matcha,
            <br />
            a story unfolds
          </motion.h1>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 220, damping: 15 }}
              className="px-8 py-3 bg-white/20 text-white font-semibold backdrop-blur-md border border-white/40 rounded-xl hover:bg-white/30 transition-colors shadow-lg"
            >
              Shop Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 220, damping: 15 }}
              className="px-8 py-3 bg-white/10 text-white font-semibold backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/20 transition-colors shadow-lg"
            >
              About
            </motion.button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
