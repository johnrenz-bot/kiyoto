import "../index.css";
import {
    FaInstagram,
    FaTiktok,
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhoneAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
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
            className="w-full py-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="max-w-6xl mx-auto px-6 lg:px-10">
                {/* Card / container */}
                <div className="rounded-3xl border border-emerald-900/40 bg-linear-to-br from-emerald-950/80 via-slate-950/90 to-black/90 shadow-2xl backdrop-blur-md px-6 py-10 md:px-10 md:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                        {/* Brand / description */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs tracking-[0.25em] text-emerald-400/70 uppercase">
                                    Kiyoto Matcha
                                </p>
                                <h2 className="text-2xl md:text-3xl font-serif text-white mt-1">
                                    Crafted for calm & clarity
                                </h2>
                            </div>

                            <p className="text-sm text-neutral-200/85 leading-relaxed">
                                Premium matcha products made for wellness, energy, and
                                mindful moments. Experience the art of Japanese tea in
                                every cup.
                            </p>

                            <ul className="space-y-2 text-sm text-neutral-200/80">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                                        <FaMapMarkerAlt className="text-xs" />
                                    </span>
                                    <span>
                                        123 Matcha Street,
                                        <br />
                                        Philippines
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                                        <FaEnvelope className="text-xs" />
                                    </span>
                                    <span>contact@kiyotomatcha.com</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                                        <FaPhoneAlt className="text-xs" />
                                    </span>
                                    <span>+63 92 123 4567</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-neutral-100 tracking-wide uppercase mb-4">
                                Navigation
                            </h3>
                            <ul className="space-y-2 text-sm text-neutral-300">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className="inline-flex items-center gap-2 hover:text-emerald-300 transition-colors duration-150"
                                        >
                                            <span className="h-px w-3 bg-emerald-500/60 rounded-full opacity-0 group-hover:opacity-100 md:block hidden" />
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h3 className="text-sm font-semibold text-neutral-100 tracking-wide uppercase mb-4">
                                Follow Us
                            </h3>
                            <p className="text-xs text-neutral-300/80 mb-3">
                                Sip, slow down, and stay inspired with our latest brews and
                                rituals.
                            </p>
                            <div className="flex gap-4 text-xl">
                                <a
                                    href={socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-600/40 bg-black/20 hover:border-emerald-400 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition"
                                    aria-label="Visit our Instagram"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href={socialLinks.tiktok}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-600/40 bg-black/20 hover:border-emerald-400 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition"
                                    aria-label="Visit our TikTok"
                                >
                                    <FaTiktok />
                                </a>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-neutral-100 tracking-wide uppercase">
                                Subscribe
                            </h3>
                            <p className="text-sm text-neutral-300/85">
                                Receive offers, recipes, and wellness tips brewed just for
                                you.
                            </p>
                            <form
                                className="mt-2 space-y-3"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <div className="flex-1 flex items-center rounded-2xl bg-slate-900/80 border border-slate-700/70 focus-within:border-emerald-400/80 focus-within:ring-2 focus-within:ring-emerald-500/40 transition">
                                        <input
                                            type="email"
                                            placeholder="Your email address"
                                            className="w-full px-4 py-2.5 bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl text-sm font-semibold bg-linear-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-black shadow-lg shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 transition"
                                    >
                                        Join
                                    </button>
                                </div>
                                <p className="text-[11px] text-neutral-400">
                                    No spam. Just slow, intentional matcha goodness.
                                </p>
                            </form>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-emerald-900/40 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
                        <p>
                            © {new Date().getFullYear()} Kiyoto Matcha — All rights
                            reserved.
                        </p>
                        <p className="text-[11px]">
                            Brewed with care · Designed for mindful dashboards
                        </p>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
