import "../index.css";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { motion } from "framer-motion";

export default function LandingContact() {
  return (
    <section className="w-full min-h-screen py-20 flex justify-center items-center bg-linear-to-t from-[#6b7b69] to-black px-6">
      <motion.div
        className="max-w-4xl w-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 flex flex-col md:flex-row gap-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="md:w-1/2 flex flex-col justify-center items-center text-white text-center px-6">
          <FaEnvelopeOpenText className="text-6xl mb-4 opacity-90 drop-shadow-md" />
          <h2 className="text-3xl font-serif font-semibold">Contact Us</h2>
          <p className="mt-4 text-white/80 leading-relaxed">
            Have a question or want to work with us? Send us your message and
            we’ll get back to you shortly.
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center items-center">
          <form className="w-full flex flex-col gap-5">
            <input
              type="text"
              placeholder="Name"
              className="p-3 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-white/60 focus:outline-none backdrop-blur-md"
            />

            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-white/60 focus:outline-none backdrop-blur-md"
            />

            <textarea
              placeholder="Message"
              className="p-3 h-32 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/30 resize-none focus:ring-2 focus:ring-white/60 focus:outline-none backdrop-blur-md"
            />

            <button
              type="submit"
              className="py-3 rounded-xl bg-white/20 text-white font-semibold tracking-wide border border-white/40 hover:bg-white/30 transition-all duration-300 backdrop-blur-md"
            >
              Send
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
