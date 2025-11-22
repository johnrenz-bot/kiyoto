import "../index.css";
import { motion } from "framer-motion";

const frontVariants = {
  rest: { rotateY: 0 },
  hover: { rotateY: 180 },
};

const backVariants = {
  rest: { rotateY: -180 },
  hover: { rotateY: 0 },
};

export default function LandingProduct() {
  const backImages = [
    "/Image/Product/balc.jpg",
    "/Image/Product/p.jpg",
    "/Image/Product/pr.jpg",
  ];

  const quotes = [
    "Matcha crafted with passion and purity.",
    "Tradition and taste blended perfectly.",
    "A sip of wellness in every cup.",
  ];

  const videos = [
    "/Video/Product/Videoproduct1.mp4",
    "/Video/Product/Videoproduct2.mp4",
    "/Video/Product/Videoproduct3.mp4",
  ];

  return (
    <section className="w-full min-h-screen py-20 bg-linear-to-b from-[#6b7b69] to-black flex justify-center">
      <div className="max-w-6xl w-full px-6">
        <h2 className="text-4xl font-serif font-semibold text-center mb-14 text-emerald-50">
          Product
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {videos.map((video, i) => (
            <motion.div
              key={i}
              className="relative w-72 h-96"
              style={{ perspective: 1000 }}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.div
                variants={frontVariants}
                transition={{ duration: 0.7 }}
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border border-emerald-900/40 bg-black"
              >
                <video
                  src={video}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                />
              </motion.div>

              <motion.div
                variants={backVariants}
                transition={{ duration: 0.7 }}
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border border-emerald-900/40 bg-black flex items-center justify-center"
              >
                <img
                  src={backImages[i]}
                  alt="Back"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 "
                />
                <div className="relative z-10 flex flex-col justify-center items-center p-6 text-emerald-50 ">
                  <img
                    src="/Image/Header/logoo.png"
                    alt="Logo"
                    className="w-20 h-20 object-contain mb-4"
                  />
                  <blockquote className="text-lg italic text-center font-serif px-2 drop-shadow-md">
                    {quotes[i]}
                  </blockquote>
                </div>
              </motion.div>
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
