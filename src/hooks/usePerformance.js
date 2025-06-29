import { useEffect, useCallback, useRef, useState } from 'react';

// Performance monitoring hook
export const usePerformanceMonitor = (componentName) => {
  const renderStartTime = useRef(Date.now());
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    const renderTime = Date.now() - renderStartTime.current;
    
    // Log performance in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName} - Render #${renderCount.current} took ${renderTime}ms`);
    }
    
    renderStartTime.current = Date.now();
  });

  const measureOperation = useCallback((operationName, fn) => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName}.${operationName} took ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  }, [componentName]);

  return { measureOperation };
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef();
  const callbackRef = useRef();

  const setCallbackRef = useCallback((callback) => {
    callbackRef.current = callback;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !callbackRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callbackRef.current();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return [elementRef, setCallbackRef];
};

// Debounce hook for search optimization
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

// Virtual scrolling hook for large lists
export const useVirtualScroll = ({ items, containerHeight, itemHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(visibleStart, visibleEnd).map((item, index) => ({
    ...item,
    index: visibleStart + index
  }));

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll
  };
};

// Image lazy loading hook
export const useLazyImage = (src, placeholder = '') => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setInView] = useIntersectionObserver();

  useEffect(() => {
    setInView(() => {
      const img = new Image();
      img.onload = () => setImageSrc(src);
      img.src = src;
    });
  }, [src, setInView]);

  return [imageRef, imageSrc];
};
