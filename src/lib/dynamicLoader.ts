/**
 * Dynamic content loader utility
 * Provides functions to dynamically load and cache content from the API
 */

import { apiFetch, BASE } from './api';
import { ROUTES } from './apiRoutes';

// Cache for API responses
const apiCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Dynamically loads content from the API with caching
 * @param endpoint - API endpoint to fetch from
 * @param params - Optional query parameters
 * @param forceRefresh - Whether to bypass cache
 * @returns The fetched data
 */
export async function dynamicLoad(endpoint: string, params: Record<string, any> = {}, forceRefresh = false): Promise<any> {
  // Build query string
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  
  const url = `${BASE}${endpoint}${queryString ? `?${queryString}` : ''}`;
  const cacheKey = url;
  
  // Check cache if not forcing refresh
  if (!forceRefresh && apiCache[cacheKey] && Date.now() - apiCache[cacheKey].timestamp < CACHE_DURATION) {
    return apiCache[cacheKey].data;
  }
  
  try {
    const data = await apiFetch(url);
    
    // Cache the result
    apiCache[cacheKey] = {
      data,
      timestamp: Date.now()
    };
    
    return data;
  } catch (error) {
    console.error(`Error loading dynamic content from ${url}:`, error);
    throw error;
  }
}

/**
 * Dynamically loads products with filtering and pagination
 * @param options - Filter and pagination options
 * @returns Filtered products
 */
export async function loadProducts(options: {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
} = {}): Promise<any> {
  const params: Record<string, any> = { ...options };
  return dynamicLoad(ROUTES.PRODUCTS.BASE, params);
}

/**
 * Clears the API cache
 * @param endpoint - Optional specific endpoint to clear
 */
export function clearCache(endpoint?: string): void {
  if (endpoint) {
    // Clear specific endpoint cache
    Object.keys(apiCache).forEach(key => {
      if (key.includes(endpoint)) {
        delete apiCache[key];
      }
    });
  } else {
    // Clear all cache
    Object.keys(apiCache).forEach(key => {
      delete apiCache[key];
    });
  }
}