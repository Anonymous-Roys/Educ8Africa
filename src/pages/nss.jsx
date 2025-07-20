
import React, { useState, useEffect, useMemo, memo } from 'react';
import Navbar from '../component/Navbar_Enhanced';
import NssBoard from '../component/NssBoard';
import Footer from '../component/Footer';
import { ToastProvider } from '../context/ToastContext';
import SkipNavigation from '../components/common/SkipNavigation';
import ScrollToTop from '../components/common/ScrollToTop';
import MetaTags from '../components/common/MetaTags';
import { useLocalStorage, usePerformanceMonitor } from '../hooks';
import { ArrowLeft, Users, Award, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// Memoized Statistics Card Component
const StatCard = memo(({ stat, darkMode, index }) => {
  const IconComponent = stat.icon;
  
  return (
    <div 
      className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-white'
      } border ${darkMode ? 'border-gray-600' : 'border-gray-200'} shadow-sm hover:shadow-md`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-center mb-4">
        <div className={`w-12 h-12 rounded-lg ${
          darkMode ? 'bg-gray-600' : 'bg-white'
        } flex items-center justify-center shadow-sm`}>
          <IconComponent className={`w-6 h-6 ${stat.color}`} />
        </div>
      </div>
      <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
        {stat.number}
      </div>
      <div className={`text-sm font-medium ${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {stat.label}
      </div>
    </div>
  );
});

// Memoized Benefit Card Component
const BenefitCard = memo(({ benefit, darkMode, index }) => (
  <div 
    className="text-center transform transition-all duration-300 hover:scale-105"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <h3 className={`text-lg font-semibold mb-2 ${
      darkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {benefit.title}
    </h3>
    <p className={`text-sm leading-relaxed ${
      darkMode ? 'text-gray-300' : 'text-gray-600'
    }`}>
      {benefit.description}
    </p>
  </div>
));

function NSS() {
  const { measureOperation } = usePerformanceMonitor('NSS Page');
  
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

  // Memoized statistics data to prevent unnecessary re-renders
  const nssStats = useMemo(() => [
    {
      icon: Users,
      number: '500+',
      label: 'Active Participants',
      color: 'text-blue-600'
    },
    {
      icon: Award,
      number: '95%',
      label: 'Completion Rate',
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      number: '15+',
      label: 'Partner Organizations',
      color: 'text-red-600'
    }
  ], []);

  // Memoized benefits data
  const programBenefits = useMemo(() => [
    {
      title: 'Industry Experience',
      description: 'Gain hands-on experience in cybersecurity and tech operations'
    },
    {
      title: 'Professional Network',
      description: 'Connect with industry leaders and fellow professionals'
    },
    {
      title: 'Skill Development',
      description: 'Enhance your technical and soft skills through real projects'
    },
    {
      title: 'Career Growth',
      description: 'Build a strong foundation for your cybersecurity career'
    }
  ], []);

  // SEO metadata
  const pageMetadata = useMemo(() => ({
    title: "National Service Program - Educ8Africa | Cybersecurity Career Launch",
    description: "Join our National Service Program and gain valuable industry experience while contributing to Africa's digital transformation and cybersecurity advancement. 500+ active participants, 95% completion rate.",
    keywords: "National Service Program, cybersecurity internship, Africa tech training, career development, industry experience, professional network, skill development",
    url: `${window.location.origin}/nss`
  }), []);

  return (
    <ToastProvider darkMode={darkMode}>
      <MetaTags {...pageMetadata} />
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <SkipNavigation />
        
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          activeSection="nss"
        />
        
        <main id="main-content" className="relative pt-16">
          {/* Page Header */}
          <section className={`py-12 px-4 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <Link 
                  to="/"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  aria-label="Return to home page"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>
              

            </div>
          </section>

          {/* NSS Board Section */}
          <section id="nss" className="scroll-mt-16">
            <NssBoard darkMode={darkMode} />
          </section>
        </main>
        
        <Footer darkMode={darkMode} />
        <ScrollToTop darkMode={darkMode} />
      </div>
    </ToastProvider>
  );
}

export default memo(NSS);
