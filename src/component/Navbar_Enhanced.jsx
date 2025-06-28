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
    { id: 'about', label: 'About Us', href: '#about' },
    { id: 'jobboard', label: 'Joblist', href: '#jobboard' },
    { id: 'nss', label: 'NSS Openings', href: '#nss' },
    { id: 'contact', label: 'Contact Us', href: '#contact' }
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
      const navbarHeight = 80; // Account for navbar height
      const elementPosition = section.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`text-base font-medium transition-all duration-200 cursor-pointer relative group ${
                activeSection === item.id
                  ? darkMode 
                    ? "text-red-400" 
                    : "text-red-600"
                  : darkMode 
                    ? "text-gray-300 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
            >
              {item.label}
              {/* Active indicator */}
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-200 ${
                activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </a>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <AccessibleButton
            onClick={toggleDarkMode}
            variant="ghost"
            size="medium"
            className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? "text-gray-300 hover:text-white hover:bg-gray-700" 
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
            ariaLabel={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </AccessibleButton>

          {/* Mobile menu button */}
          <AccessibleButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            variant="ghost"
            size="medium"
            className={`md:hidden p-2 rounded-lg transition-colors ${
              darkMode 
                ? "text-gray-300 hover:text-white hover:bg-gray-700" 
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
            ariaLabel="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </AccessibleButton>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-t`}>
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`block text-base font-medium transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? darkMode 
                      ? "text-red-400" 
                      : "text-red-600"
                    : darkMode 
                      ? "text-gray-300 hover:text-white" 
                      : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
