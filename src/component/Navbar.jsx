import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Logo } from "../data/img";
import ProgressBar from "./ProgressBar";

// eslint-disable-next-line react/prop-types
const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50); // Set scrolled state
      setMobileMenuOpen(false); // Close mobile menu on scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300  
        ${scrolled ? "opacity-95 backdrop-blur-lg" : "opacity-100"}
        ${darkMode ? "bg-gray-800/80" : "bg-white/80"} shadow-sm`}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <ProgressBar/>
      <div
        className={`max-w-7xl mx-auto px-4 flex justify-between items-center transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        {/* Animated Logo */}
        <img
          src={Logo}
          alt="Educ8Africa Logo"
          className={`h-12 cursor-pointer transition-transform duration-1000 ease-in-out ${
            scrolled ? "animate-bounce" : ""
          }`}
          onClick={() => scrollToSection("#")} // Scroll to top
        />

       

        {/* Navigation Links */}
        <nav className={`hidden md:flex space-x-6`}>
          <a
            href="#joblist"
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } hover:text-red-500 transition-colors cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#joblist");
            }}
          >
            Joblist
          </a>
          <a
            href="#about"
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } hover:text-red-500 transition-colors cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#about");
            }}
          >
            About Us
          </a>
        </nav>

        <div className="flex gap-2">

        <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-lg ${
          darkMode
          ? "bg-gray-700 hover:bg-gray-600"
          : "bg-gray-100 hover:bg-gray-200"
        } transition-colors`}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
        {darkMode ? (
          <Sun className="text-yellow-500" />
        ) : (
          <Moon className="text-gray-600" />
        )}
      </button>
       {/* Mobile Menu Button */}
       <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg ${
            darkMode ? "bg-gray-700 " : "bg-gray-100"
          } transition-colors`}
          aria-label="Toggle mobile menu"
          >
          {/* Icon for Menu */}
          {mobileMenuOpen ? (
            <span className="text-gray-600">✖</span> // Close icon
          ) : (
            <span className="text-gray-100">☰</span> // Open icon
          )}
        </button>
          </div>
      </div>

      {/* Mobile Navigation Links */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <a
            href="#joblist"
            className={`block px-4 py-2 text-lg font-semibold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } hover:text-red-500 transition-colors cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#joblist");
              setMobileMenuOpen(false); // Close menu after selection
            }}
          >
            Joblist
          </a>
          <a
            href="#about"
            className={`block px-4 py-2 text-lg font-semibold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } hover:text-red-500 transition-colors cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#about");
              setMobileMenuOpen(false); // Close menu after selection
            }}
          >
            About Us
          </a>
        </nav>
      )}

      {/* Dark Mode Toggle */}
      
    </header>
  );
};

export default Navbar;
