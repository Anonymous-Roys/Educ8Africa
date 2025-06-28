import { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { dataHelpers } from '../utils/dataStore';
import { cache } from '../utils/cache';

export const usePositions = (type) => {
  const { state } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Memoize positions to prevent unnecessary recalculations
  const positions = useMemo(() => {
    if (!state.data.isInitialized) return [];
    
    const cacheKey = `positions-${type}`;
    const cached = cache.get(cacheKey);
    
    if (cached) return cached;
    
    const positionData = dataHelpers.getPositionsByType(type);
    cache.set(cacheKey, positionData, 5 * 60 * 1000); // 5 minutes
    
    return positionData;
  }, [state.data.positions, type, state.data.isInitialized]);
  
  // Virtual scrolling for large datasets
  const useVirtualScrolling = positions.length > 50;
  
  return {
    positions,
    loading: state.ui.isLoading || loading,
    error: error || state.ui.errors[0]?.message,
    useVirtualScrolling,
    isInitialized: state.data.isInitialized
  };
};

// Virtual scrolling implementation
export const useVirtualScrolling = (items, itemHeight = 200, containerHeight = 600) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(visibleStart, visibleEnd);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;
  
  return {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll: (e) => setScrollTop(e.target.scrollTop)
  };
};

// Debounced search hook
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Retry logic for failed requests
export const useRetry = (asyncFunction, maxRetries = 3) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await asyncFunction(...args);
        setData(result);
        setLoading(false);
        return result;
      } catch (err) {
        if (attempt === maxRetries) {
          setError(err);
          setLoading(false);
          throw err;
        }
        
        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  };

  return { execute, loading, error, data };
};

// Local storage hook with caching
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [value, setStoredValue];
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, options]);

  return [setNode, isIntersecting];
};

// Window size hook for responsive design
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
