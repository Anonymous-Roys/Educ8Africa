import { useState, useEffect } from 'react';
import { LandingBg } from '../data/img';
import { ChevronDown, ArrowRight, Play } from 'lucide-react';
import AnimatedCounter from '../components/common/AnimatedCounter';
import AccessibleButton from '../components/common/AccessibleButton';
import { useIntersectionObserver } from '../hooks';

const LandingPage = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [statsRef, statsInView] = useIntersectionObserver({ threshold: 0.3 });

  useEffect(() => {
    const handleScrollAnimation = () => {
      setHasScrolled(window.scrollY > 0);
      if (window.scrollY === 0) {
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScrollAnimation);

    setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => window.removeEventListener('scroll', handleScrollAnimation);
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const handleGetStarted = () => {
    document.getElementById('jobboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchDemo = () => {
    // Add demo video functionality here
    console.log('Opening demo video...');
  };

  return (
    <div
      className={`relative flex justify-start items-center min-h-screen bg-cover bg-center transition-all duration-1000 ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}
      style={{
        backgroundImage: `url(${LandingBg})`,
      }}
    >
      {/* Enhanced background overlays */}
      <div
        className={`absolute top-0 left-0 w-full h-full 
            ${darkMode ? "bg-slate-900" : "bg-black"} bg-opacity-40 transition-all duration-1000 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`}
      />
      <div
        className={`ml-[-250px] absolute top-0 left-0 w-2/3 h-full bg-red-700 bg-opacity-60 transform origin-bottom-left skew-x-[-15deg] transition-transform duration-1000 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`}
      />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div
            className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
          >
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                darkMode ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800'
              } transition-all duration-700 delay-200 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                🚀 Transforming African Tech Education
              </span>
            </div>

            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 
                ${darkMode ? 'text-white' : 'text-white'}
                tracking-tight leading-tight text-shadow-lg
                transition-all duration-700 delay-300
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
            >
              Join Our{' '}
              <span className="gradient-text bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Tech Revolution
              </span>
            </h1>

            <p
              className={`text-lg md:text-xl leading-relaxed mb-8 max-w-2xl
                ${darkMode ? 'text-gray-200' : 'text-white'}
                text-shadow
                transition-all duration-700 delay-400
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
            >
              Be a part of{' '}
              <span className="font-bold text-red-300">Educ8Africa</span>, and shape
              the future of cybersecurity education across Africa.
              We're calling on passionate innovators to help us make a difference.
            </p>

            {/* Call-to-action buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-700 delay-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <AccessibleButton
                onClick={handleGetStarted}
                variant="primary"
                size="large"
                className="group bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                ariaLabel="Get started with Educ8Africa"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </AccessibleButton>

              <AccessibleButton
                onClick={handleWatchDemo}
                variant="secondary"
                size="large"
                className={`group ${
                  darkMode 
                    ? 'bg-white/10 text-white border-white/30 hover:bg-white/20' 
                    : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                } backdrop-blur-sm`}
                ariaLabel="Watch demo video"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </AccessibleButton>
            </div>

            {/* Statistics section */}
            <div
              ref={statsRef}
              className={`grid grid-cols-3 gap-6 transition-all duration-700 delay-600 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="text-center">
                <div className={`text-2xl md:text-3xl font-bold ${
                  darkMode ? 'text-white' : 'text-white'
                } text-shadow`}>
                  <AnimatedCounter 
                    end={500} 
                    suffix="+" 
                    startAnimation={statsInView}
                    duration={2000}
                  />
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-200'} text-shadow`}>
                  Students Trained
                </p>
              </div>
              <div className="text-center">
                <div className={`text-2xl md:text-3xl font-bold ${
                  darkMode ? 'text-white' : 'text-white'
                } text-shadow`}>
                  <AnimatedCounter 
                    end={85} 
                    suffix="%" 
                    startAnimation={statsInView}
                    duration={2000}
                  />
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-200'} text-shadow`}>
                  Job Placement Rate
                </p>
              </div>
              <div className="text-center">
                <div className={`text-2xl md:text-3xl font-bold ${
                  darkMode ? 'text-white' : 'text-white'
                } text-shadow`}>
                  <AnimatedCounter 
                    end={50} 
                    suffix="+" 
                    startAnimation={statsInView}
                    duration={2000}
                  />
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-200'} text-shadow`}>
                  Partner Companies
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Could add an image or video here */}
          <div className="hidden lg:block">
            {/* This space can be used for additional visual content */}
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <AccessibleButton
          onClick={handleScroll}
          variant="ghost"
          className={`transition-all duration-500 ${
            hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } hover:scale-110 focus:scale-110 p-2 rounded-full ${
            darkMode ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10'
          }`}
          ariaLabel="Scroll to content"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </AccessibleButton>
      </div>
    </div>
  );
};

export default LandingPage;
