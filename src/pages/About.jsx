import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar_Enhanced';
import AboutSection from '../component/About';
import Footer from '../component/Footer';
import { ToastProvider } from '../context/ToastContext';
import SkipNavigation from '../components/common/SkipNavigation';
import ScrollToTop from '../components/common/ScrollToTop';
import { useLocalStorage } from '../hooks';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function About() {
  // Use localStorage to persist dark mode preference
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ToastProvider darkMode={darkMode}>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <SkipNavigation />
        
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          activeSection="about"
        />
        
        <main id="main-content" className="relative pt-16">
          {/* Page Header */}
          <section className={`py-12 px-4 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Link 
                  to="/"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="scroll-mt-16">
            <AboutSection darkMode={darkMode} />
          </section>
        </main>
        
        <Footer darkMode={darkMode} />
        <ScrollToTop darkMode={darkMode} />
      </div>
    </ToastProvider>
  );
}

export default About;
