import { useState, useEffect } from 'react';
import { useScrollPosition } from '../../hooks';
import { ChevronUp } from 'lucide-react';
import AccessibleButton from './AccessibleButton';

const ScrollToTop = ({ darkMode = false }) => {
  const scrollPosition = useScrollPosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(scrollPosition > 300);
  }, [scrollPosition]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AccessibleButton
        onClick={scrollToTop}
        variant="primary"
        size="medium"
        ariaLabel="Scroll to top"
        className={`rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105 ${
          darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        <ChevronUp className="w-5 h-5" />
      </AccessibleButton>
    </div>
  );
};

export default ScrollToTop;
