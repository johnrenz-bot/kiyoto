import "../index.css";
import {
    FaInstagram,
    FaTiktok,
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhoneAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function LandingFooter() {
    const navItems = [
        { name: "Home", href: "#home" },
        { name: "About Us", href: "#about" },
        { name: "Products", href: "#product" },
        { name: "Contact", href: "#contact" },
    ];

    const socialLinks = {
        instagram: "https://www.instagram.com/kiyoto_co",
        tiktok:
            "https://www.tiktok.com/@kiyoto_co?is_from_webapp=1&sender_device=pc",
    };

    return (
        <motion.footer
            className="w-full bg-[#6b7b69] text-neutral-300 py-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                    <h2 className="text-2xl font-serif text-white mb-3">Kiyoto Matcha</h2>
                    <p className="text-sm text-neutral-200/80">
                        Premium matcha products crafted for wellness, energy, and mindful
                        moments. Experience the art of Japanese tea in every cup.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-200/80">
                        <li className="flex items-center gap-2">
                            <FaMapMarkerAlt /> 123 Matcha Street, Philippines
                        </li>
                        <li className="flex items-center gap-2">
                            <FaEnvelope /> contact@kiyotomatcha.com
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt /> +63 92 123 4567
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
                    <ul className="space-y-2 text-sm text-neutral-200/80">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a href={item.href} className="hover:text-white transition">
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                    <div className="flex gap-4 text-2xl">
                        <a
                            href={socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href={socialLinks.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            <FaTiktok />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
                    <p className="text-sm text-neutral-200/80 mb-3">
                        Receive the latest offers, recipes, and wellness tips.
                    </p>
                    <div className="flex bg-gray-800 rounded-xl overflow-hidden">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full px-4 py-2 bg-gray-800 text-neutral-200 focus:outline-none"
                        />
                        <button className="px-6 py-3 bg-green-500/40 text-white font-semibold hover:bg-green-500/60 transition">
                            Join
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-4 text-center text-neutral-200/80 text-sm">
                © {new Date().getFullYear()} Kiyoto Matcha — All Rights Reserved
            </div>
        </motion.footer>
    );
}
