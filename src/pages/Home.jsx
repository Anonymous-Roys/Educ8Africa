import { useState, useEffect } from 'react';
import Navbar from '../component/Navbar_Enhanced';
import LandingPage from '../component/LandingPage';
import JobBoard from '../component/JobBoard';
import NssBoard from '../component/NssBoard';
import AboutSection from '../component/About';
import ContactUs from './ContactUs_Enhanced';
import Footer from '../component/Footer';
import { ToastProvider } from '../context/ToastContext';
import SkipNavigation from '../components/common/SkipNavigation';
import ScrollToTop from '../components/common/ScrollToTop';
import { useActiveSection, useLocalStorage } from '../hooks';

function Home() {
  // Use localStorage to persist dark mode preference
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  
  // Track active section for navigation highlighting
  const activeSection = useActiveSection(['home', 'about', 'jobboard', 'nss', 'contact']);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Add smooth scrolling behavior and section IDs
  useEffect(() => {
    // Apply dark mode class to html element
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
          activeSection={activeSection}
        />
        
        <main id="main-content" className="relative pt-16">
          <section id="home" className="scroll-mt-16">
            <LandingPage darkMode={darkMode} />
          </section>
          
          <section id="about" className="scroll-mt-16">
            <AboutSection darkMode={darkMode} />
          </section>
          
          <section id="jobboard" className="scroll-mt-16">
            <JobBoard darkMode={darkMode} />
          </section>
          
          <section id="nss" className="scroll-mt-16">
            <NssBoard darkMode={darkMode} />
          </section>
          
          <section id="contact" className="scroll-mt-16">
            <ContactUs darkMode={darkMode} />
          </section>
        </main>
        
        <Footer darkMode={darkMode} />
        <ScrollToTop darkMode={darkMode} />
      </div>
    </ToastProvider>
  );
}

export default Home;
