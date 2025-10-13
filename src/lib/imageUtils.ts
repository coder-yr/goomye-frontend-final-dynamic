/**
 * Utility functions for handling images in the application
 */

// Base URL for image assets - using empty string as fallback to ensure local paths work
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || '';

/**
 * Formats an image URL to ensure it's properly loaded
 * @param imagePath - The image path or URL
 * @param fallback - Optional fallback image if the provided one is invalid
 * @returns A properly formatted image URL
 */
export function getImageUrl(imagePath: string | undefined | null, fallback: string = '/placeholder.svg'): string {
  if (!imagePath) return fallback;
  
  // If it's already an absolute URL, return it
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a local path starting with '/', use it directly from public folder
  if (imagePath.startsWith('/')) {
    // Remove any double slashes that might cause issues
    return imagePath.replace(/\/+/g, '/');
  }
  
  // Otherwise, prepend the base URL
  return `${IMAGE_BASE_URL}${imagePath}`;
}

/**
 * Safely gets an image URL with error handling
 * @param image - The image path, URL, or object
 * @param fallback - Optional fallback image
 * @returns A safe image URL
 */
export function getSafeImageUrl(image: any, fallback: string = '/placeholder.svg'): string {
  try {
    if (!image) return fallback;
    
    // If it's a string, process it directly
    if (typeof image === 'string') {
      // Handle JSON string arrays (common in API responses)
      if (image.startsWith('[') && image.endsWith(']')) {
        try {
          const parsed = JSON.parse(image);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return getImageUrl(parsed[0], fallback);
          }
        } catch {
          // If parsing fails, treat as regular string
        }
      }
      return getImageUrl(image, fallback);
    }
    
    // If it's an array, use the first item
    if (Array.isArray(image) && image.length > 0) {
      return getImageUrl(image[0], fallback);
    }
    
    // If it's an object with a url property (common API response format)
    if (typeof image === 'object' && image !== null) {
      if (image.url) {
        return getImageUrl(image.url, fallback);
      }
      // Check for other common image properties
      if (image.src) {
        return getImageUrl(image.src, fallback);
      }
      if (image.path) {
        return getImageUrl(image.path, fallback);
      }
    }
    
    // If we couldn't process the image, return the fallback
    return fallback;
  } catch (error) {
    console.error('Error processing image URL:', error);
    return fallback;
  }
}