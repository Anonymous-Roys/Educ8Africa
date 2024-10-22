import { useState, useEffect } from 'react';
import { LandingBg } from '../data/img';
import { ChevronDown } from 'lucide-react'; // Large down arrow icon

// eslint-disable-next-line react/prop-types
const LandingPage = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false)




  useEffect(() => {
    const handleScrollAnimation = () => {
        setHasScrolled(window.scrollY > 0);
      if (window.scrollY === 0) {
        // setIsVisible(false);
        // requestAnimationFrame(() => {
        //     setIsVisible(true);
        //   })
        setTimeout(() => {
          setIsVisible(true); // Triggers the animation again upon scrolling up
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScrollAnimation);

    setTimeout(() => {
      setIsVisible(true); // Initial animation when page loads
    }, 500);

    return () => window.removeEventListener('scroll', handleScrollAnimation);
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`relative flex justify-start items-center h-screen bg-cover bg-center transition-all duration-1000 ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}
      style={{
        backgroundImage: `url(${LandingBg})`,
      }}
    >
      {/* Diagonal background overlay */}
      <div
        className={` absolute top-0 left-0 w-full h-full 
            ${darkMode ? "bg-slate-900" : "" } bg-opacity-50 transform origin-bottom-left transition-transform duration-1000 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`}
      ></div>
      <div
        className={`ml-[-250px] absolute top-0 left-0 w-2/3 h-full bg-red-700 bg-opacity-50 transform origin-bottom-left skew-x-[-15deg] transition-transform duration-1000 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`}
      ></div>

      {/* Text content */}
      <div
        className={`relative z-10 max-w-xl p-8 bg-opacity-80 md:bg-transparent bg-slate-500 rounded-lg transition-all duration-1000 transform ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`}
        style={{ marginLeft: '5%' }} // Positioned a bit to the left
      >
        <h1
          className={`text-4xl md:text-6xl font-extrabold mb-8 
            ${darkMode ? 'text-white' : 'text-gray-900'}
            tracking-tight leading-tight
            transition-all duration-700 delay-300
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          Join Our Tech
          <span className="block">Revolution</span>
        </h1>

        <p
          className={`text-lg md:text-xl leading-relaxed
            ${darkMode ? 'text-gray-200' : 'text-white'}
            transition-all duration-700 delay-400
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          Be a part of{' '}
          <span className="text-indigo-500 font-bold">Educ8Africa</span>, and shape
          the future of cybersecurity education across Africa.
          <br className="hidden md:block" />
          We&apos;re calling on passionate innovators to help us make a difference.
        </p>
      </div>

      {/* Large down arrow for scrolling */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
      <button
        onClick={handleScroll}
        className={`absolute bottom-2 left-1/2 -translate-x-1/2
          transition-all duration-500
          ${hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          hover:scale-110 focus:scale-110
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          rounded-full p-2
        `}
        aria-label="Scroll to content"
      >
        <ChevronDown 
          className={`w-16 h-16 animate-bounce
            ${darkMode ? 'text-white' : 'text-gray-900'}
          `}
        />
      </button>
      </div>
    </div>
  );
};

export default LandingPage;
