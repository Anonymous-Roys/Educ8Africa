import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Logo } from "../data/img";
import ProgressBar from "./ProgressBar";
import AccessibleButton from "../components/common/AccessibleButton";

const Navbar = ({ darkMode, toggleDarkMode, activeSection = 'home' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'jobboard', label: 'Job Board', href: '#jobboard' },
    { id: 'nss', label: 'NSS Openings', href: '#nss' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
      setMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300  
        ${scrolled ? "opacity-95 backdrop-blur-lg" : "opacity-100"}
        ${darkMode ? "bg-gray-800/90" : "bg-white/90"} shadow-sm border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <ProgressBar/>
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        {/* Enhanced Logo */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Educ8Africa Logo"
            className={`h-10 sm:h-12 cursor-pointer transition-all duration-300 ${
              scrolled ? "h-8 sm:h-10" : ""
            }`}
            onClick={() => scrollToSection('#home')}
          />
          <span 
            className={`ml-3 font-bold text-lg ${
              darkMode ? 'text-white' : 'text-gray-900'
            } hidden sm:block cursor-pointer`}
            onClick={() => scrollToSection('#home')}
          >
            Educ8Africa
          </span>
        </div>

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
          <a
            href="#contact"
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } hover:text-red-500 transition-colors cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#contact");
            }}
          >
            Contact Us
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
            darkMode
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-100 hover:bg-gray-200"
          } transition-colors`}
          aria-label="Toggle mobile menu"
          >
          {/* Icon for Menu */}
          {mobileMenuOpen ? (
            <span className="text-gray-600">✖</span> // Close icon
          ) : (
            <span className={`${darkMode ? 'text-gray-100':'text-gray-900'}`}>☰</span> // Open icon
          )}
        </button>
          </div>
      </div>

      {/* Mobile Navigation Links */}
      {mobileMenuOpen && (
        <nav className="bg-white shadow-md md:hidden">
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
          <a
            href="#contact"
            className={`block px-4 py-2 text-lg font-semibold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } hover:text-red-500 transition-colors cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#contact");
              setMobileMenuOpen(false); // Close menu after selection
            }}
          >
            Contact Us
          </a>
        </nav>
      )}

      {/* Dark Mode Toggle */}
      
    </header>
  );
};

export default Navbar;
