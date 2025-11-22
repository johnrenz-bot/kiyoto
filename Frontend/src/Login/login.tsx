import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then((result) => {
        if (!result.ok) {
          setIsOpen(true);
          return;
        }

        localStorage.setItem("user", JSON.stringify(result.data.user));
        navigate("/dashboard");
      })
      .catch(() => setIsOpen(true));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#020b07] via-[#18281f] to-[#020605] text-emerald-50 px-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-gray-900 p-6 rounded-2xl w-80 text-center shadow-xl"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
            >
              <h1 className="text-lg font-semibold">Invalid login</h1>
              <p className="text-gray-600 mt-2 text-sm">Incorrect email or password.</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 text-sm"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="w-full max-w-4xl rounded-3xl h-[55vh] bg-black/50 border border-emerald-500/30 shadow-xl overflow-hidden flex flex-col md:flex-row"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="hidden md:flex md:w-1/2 items-center justify-center bg-linear-to-b from-emerald-700 via-emerald-500 to-amber-200 text-center px-8"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-emerald-50/80">Kiyoto Matcha</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Crafted with passion and purity</h2>
            <p className="mt-3 text-sm text-emerald-50/85">
              Sign in to access your orders, rewards, and matcha recommendations.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 bg-[#050908] px-7 py-9 relative"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <Link to="/" className="absolute top-4 left-6 text-xs text-emerald-100/70 hover:text-emerald-200">
            ← Back to home
          </Link>

          <div className="mt-6 text-center">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-200/80">Welcome back</p>
            <h1 className="text-2xl font-semibold mt-2">Sign in to your account</h1>
          </div>

          <form onSubmit={handleLogin} className="mt-7 space-y-4 text-sm">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-emerald-500/40 px-4 py-3 rounded-lg"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-emerald-500/40 px-4 py-3 rounded-lg"
              required
            />
            <motion.button
              type="submit"
              className="w-full mt-1 bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-semibold py-3 rounded-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Login
            </motion.button>
          </form>

          <div className="flex justify-between text-xs mt-6 text-emerald-100/80">
            <Link to="/forgot-password" className="hover:text-emerald-200 underline-offset-2 hover:underline">
              Forgot password?
            </Link>
            <Link to="/register" className="hover:text-emerald-200 underline-offset-2 hover:underline">
              Create an account
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
