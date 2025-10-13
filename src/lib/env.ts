/**
 * Environment variable management
 * Centralizes access to environment variables with proper typing and fallbacks
 */

// API configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api';
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || '';

// Feature flags
export const ENABLE_ANALYTICS = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
export const ENABLE_MOCK_API = import.meta.env.VITE_ENABLE_MOCK_API === 'true';

// App configuration
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Goomye';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
export const IS_PRODUCTION = import.meta.env.PROD;
export const IS_DEVELOPMENT = import.meta.env.DEV;

// Security
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

/**
 * Get an environment variable with type safety
 * @param key - The environment variable key
 * @param fallback - Fallback value if not found
 * @returns The environment variable value or fallback
 */
export function getEnv<T>(key: string, fallback: T): T {
  const value = import.meta.env[key];
  return value !== undefined ? value as unknown as T : fallback;
}

/**
 * Validate that required environment variables are present
 * @param requiredVars - Array of required environment variable keys
 * @returns Array of missing variables
 */
export function validateEnv(requiredVars: string[]): string[] {
  const missing: string[] = [];
  
  for (const key of requiredVars) {
    if (import.meta.env[key] === undefined) {
      missing.push(key);
      console.error(`Missing required environment variable: ${key}`);
    }
  }
  
  return missing;
}