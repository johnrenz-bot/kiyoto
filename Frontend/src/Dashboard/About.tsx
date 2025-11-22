"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row items-center px-6 lg:px-20 py-16 gap-16 text-white">
      <motion.section
        className="w-full lg:w-1/2 max-w-3xl text-center lg:text-left space-y-6"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className=" text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
          About
        </h1>

        <h2 className="text-2xl sm:text-3xl font-serif ">
          Kiyoto Matcha
        </h2>

        <p className="text-white/70 text-base sm:text-lg lg:text-xl leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          eveniet voluptates est perferendis maxime fuga, fugiat recusandae
          nisi? Dolores itaque aliquid in similique ipsum laudantium, doloribus
          rerum reiciendis veniam minima.
        </p>

        <p className="text-white/70 text-base sm:text-lg lg:text-xl leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab eveniet
          eius soluta fugiat debitis quae commodi magnam, eos rem pariatur
          atque enim? Error maiores in earum, adipisci hic pariatur temporibus!
        </p>
      </motion.section>

      <motion.section
        className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.img
          src="/Image/Product/balc.jpg"
          alt="Kiyoto Matcha product display"
          className="w-full max-w-2xl rounded-3xl object-cover shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        />
      </motion.section>
    </main>
  );
}
