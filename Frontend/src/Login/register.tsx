import "../index.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Registered successfully! You can now log in.");
      setForm({
        fullName: "",
        contactNumber: "",
        email: "",
        password: "",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#020b07] via-[#18281f] to-[#020605] text-emerald-50 px-4">
      <motion.div
        className="w-full max-w-4xl rounded-3xl bg-black/50 border border-emerald-500/30 shadow-xl overflow-hidden flex flex-col md:flex-row"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="hidden md:flex md:w-1/2 items-center justify-center bg-linear-to-b from-emerald-700 via-emerald-500 to-amber-200 text-center px-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-emerald-50/80">
              Join the ritual
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Create your Kiyoto Matcha account
            </h2>
            <p className="mt-3 text-sm text-emerald-50/85">
              Track your orders, save your favorites, and earn rewards every
              time you sip.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 bg-[#050908] px-7 py-9 relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Link
            to="/login"
            className="absolute top-4 left-6 text-xs text-emerald-100/70 hover:text-emerald-200"
          >
            ← Back to login
          </Link>

          <div className="mt-6 text-center">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-200/80">
              Register
            </p>
            <h1 className="text-2xl font-semibold mt-2">Create your account</h1>
          </div>

          {error && (
            <motion.div
              className="mt-4 text-red-200 text-xs bg-red-500/10 border border-red-500/40 px-3 py-2 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              className="mt-4 text-emerald-200 text-xs bg-emerald-500/10 border border-emerald-500/40 px-3 py-2 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {success}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-sm">
            <input
              name="fullName"
              type="text"
              placeholder="Full name"
              className="w-full bg-black/40 border border-emerald-500/40 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-50 placeholder:text-emerald-100/40"
              required
              value={form.fullName}
              onChange={handleChange}
            />
            <input
              name="contactNumber"
              type="text"
              maxLength={11}
              placeholder="Contact number"
              className="w-full bg-black/40 border border-emerald-500/40 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-50 placeholder:text-emerald-100/40"
              required
              value={form.contactNumber}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full bg-black/40 border border-emerald-500/40 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-50 placeholder:text-emerald-100/40"
              required
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full bg-black/40 border border-emerald-500/40 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-50 placeholder:text-emerald-100/40"
              required
              value={form.password}
              onChange={handleChange}
            />

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full mt-1 bg-emerald-500 text-gray-900 font-semibold py-3 rounded-lg hover:bg-emerald-400 transition disabled:opacity-60"
              whileHover={{ scale: loading ? 1 : 1.03 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              transition={{ type: "spring", stiffness: 220, damping: 15 }}
            >
              {loading ? "Registering..." : "Create account"}
            </motion.button>
          </form>

          <div className="flex items-center gap-2 mt-5">
            <hr className="flex-1 border-emerald-900" />
            <span className="text-emerald-200 text-xs">or</span>
            <hr className="flex-1 border-emerald-900" />
          </div>

          <motion.button
            className="mt-3 w-full flex items-center justify-center gap-2 border border-emerald-500/40 py-3 rounded-lg hover:bg-white/5 transition text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
          >
            <FcGoogle size={20} />
            <span className="font-medium text-emerald-50">
              Continue with Google
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
