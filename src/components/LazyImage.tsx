import { useState, useEffect, useRef } from 'react';
import { getSafeImageUrl } from '@/lib/imageUtils';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  width?: number;
  height?: number;
}

const LazyImage = ({
  src,
  alt,
  className = '',
  fallback = '/placeholder.svg',
  width,
  height
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setError(false);
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Only load the image when it comes into view
        setImageSrc(getSafeImageUrl(src, fallback));
        observer.disconnect();
      }
    }, { rootMargin: '200px' }); // Start loading when image is 200px from viewport
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [src, fallback]);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  const handleError = () => {
    setError(true);
    setImageSrc(fallback);
  };
  
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <img
        ref={imgRef}
        src={imageSrc || fallback}
        alt={alt}
        className={`w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        width={width}
        height={height}
      />
    </div>
  );
};

export default LazyImage;