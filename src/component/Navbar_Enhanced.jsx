import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../data/img";
import ProgressBar from "./ProgressBar";
import AccessibleButton from "../components/common/AccessibleButton";

const Navbar = ({ darkMode, toggleDarkMode, activeSection = 'home' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', route: '/', href: '#home' },
    { id: 'about', label: 'About Us', route: '/about', href: '#about' },
    { id: 'jobboard', label: 'Internship Programme', route: '/jobs', href: '#jobboard' },
    { id: 'nss', label: 'NSP Programme', route: '/nss', href: '#nss' },
    { id: 'contact', label: 'Contact Us', route: '/contact', href: '#contact' }
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

  const isHomePage = location.pathname === '/';

  const handleNavigation = (item) => {
    // Always navigate to separate pages for all sections except home scroll
    if (item.id === 'home') {
      if (isHomePage) {
        // If we're on home page, scroll to top
        scrollToSection('#home');
      } else {
        // If we're on a different page, navigate to home
        navigate('/');
      }
    } else {
      // For all other sections, navigate to their respective pages
      navigate(item.route);
    }
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      // Calculate navbar height to offset scroll position
      const navbarHeight = 70; // Reduced navbar height
      const elementPosition = section.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const handleLogoClick = () => {
    if (isHomePage) {
      scrollToSection('#home');
    } else {
      navigate('/');
    }
  };

  // Determine active section based on current route
  const getCurrentActiveSection = () => {
    if (isHomePage) {
      return activeSection;
    }
    
    // Map routes to section IDs
    const routeToSection = {
      '/about': 'about',
      '/jobs': 'jobboard', 
      '/nss': 'nss',
      '/contact': 'contact'
    };
    
    return routeToSection[location.pathname] || 'home';
  };

  const currentActiveSection = getCurrentActiveSection();

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
          scrolled ? "py-1" : "py-2"
        }`}
      >
        {/* Enhanced Logo */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Educ8Africa Logo"
            className={`h-12 sm:h-16 cursor-pointer transition-all duration-300 ${
              scrolled ? "h-10 sm:h-12" : ""
            }`}
            onClick={handleLogoClick}
          />
          <span 
            className={`ml-3 font-bold text-xl ${
              darkMode ? 'text-white' : 'text-gray-900'
            } hidden sm:block cursor-pointer`}
            onClick={handleLogoClick}
          >
            Educ8Africa
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`text-base font-medium transition-all duration-200 cursor-pointer relative group ${
                currentActiveSection === item.id
                  ? darkMode 
                    ? "text-red-400" 
                    : "text-red-600"
                  : darkMode 
                    ? "text-gray-300 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => handleNavigation(item)}
            >
              {item.label}
              {/* Active indicator */}
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-200 ${
                currentActiveSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>
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
              <button
                key={item.id}
                className={`block w-full text-left text-base font-medium transition-colors cursor-pointer ${
                  currentActiveSection === item.id
                    ? darkMode 
                      ? "text-red-400" 
                      : "text-red-600"
                    : darkMode 
                      ? "text-gray-300 hover:text-white" 
                      : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => handleNavigation(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
