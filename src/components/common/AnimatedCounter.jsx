import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  startAnimation = true,
  className = ''
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!startAnimation) return;
    
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutCubic * end);
      
      setCount(currentCount);
      
      if (progress === 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16); // ~60fps
    
    return () => clearInterval(timer);
  }, [end, duration, startAnimation]);
  
  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

AnimatedCounter.propTypes = {
  end: PropTypes.number.isRequired,
  duration: PropTypes.number,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  startAnimation: PropTypes.bool,
  className: PropTypes.string
};

export default AnimatedCounter;
