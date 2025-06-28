import { useIntersectionObserver } from '../../hooks';
import PropTypes from 'prop-types';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholderClassName = 'bg-gray-200 animate-pulse',
  onLoad,
  ...props 
}) => {
  const [imageRef, isIntersecting, hasIntersected] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  return (
    <div ref={imageRef} className={`${className} overflow-hidden`}>
      {hasIntersected ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
          onLoad={onLoad}
          {...props}
        />
      ) : (
        <div className={`w-full h-full ${placeholderClassName}`} />
      )}
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholderClassName: PropTypes.string,
  onLoad: PropTypes.func
};

export default LazyImage;
