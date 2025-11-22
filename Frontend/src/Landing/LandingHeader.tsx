import "../index.css";
import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart, MdOutlineSearch } from "react-icons/md";
import { CiUser } from "react-icons/ci";

export default function LandingHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = (section: string) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["home", "about", "product", "contact"];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all text-gray-300 ${
        scrolled ? "backdrop-blur-md shadow-md text-white" : "bg-transparent"
      }`}
    >
      <nav className="h-16 md:h-20 flex items-center justify-between px-5 md:px-10">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="relative h-10 md:h-12 w-10 md:w-12"
        >
          <img
            src="/Image/Header/logoo.png"
            alt="Logo"
            className={`absolute inset-0 transition-opacity duration-500 ${
              scrolled ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src="/Image/Header/logoo2.png"
            alt="Scrolled Logo"
            className={`absolute inset-0 transition-opacity duration-500 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-semibold">
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => scrollToSection(item)}
              className="cursor-pointer relative group capitalize"
            >
              <span>{item}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-green-500 rounded-full transition-all group-hover:w-full" />
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-5 text-xl">
          <button className="hover:text-green-500 transition">
            <MdOutlineSearch />
          </button>
          <Link to="/login" className="hover:text-green-500 transition">
            <CiUser />
          </Link>
          <Link to="/cart" className="hover:text-green-500 transition">
            <MdOutlineShoppingCart />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl hover:text-green-500 transition"
          onClick={() => setOpen(!open)}
        >
          <RxHamburgerMenu />
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-5 pb-5 bg-white/80 backdrop-blur-md shadow-lg">
          <ul className="flex flex-col gap-4 text-sm font-semibold">
            {menuItems.map((item) => (
              <li
                key={item}
                onClick={() => scrollToSection(item)}
                className="cursor-pointer capitalize hover:text-green-500 transition"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-6 mt-5 text-xl">
            <button className="hover:text-green-500 transition">
              <MdOutlineSearch />
            </button>
            <Link to="/login" className="hover:text-green-500 transition">
              <CiUser />
            </Link>
            <Link to="/cart" className="hover:text-green-500 transition">
              <MdOutlineShoppingCart />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
