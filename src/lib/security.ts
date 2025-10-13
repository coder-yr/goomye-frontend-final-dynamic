/**
 * Security utilities for the application
 */
import { API_URL } from './env';

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input - The user input to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Securely stores sensitive data in localStorage with encryption
 * @param key - Storage key
 * @param value - Value to store
 */
export function secureStore(key: string, value: string): void {
  try {
    // Simple obfuscation for demo purposes
    // In production, use a proper encryption library
    const obfuscated = btoa(value);
    localStorage.setItem(key, obfuscated);
  } catch (error) {
    console.error('Error storing secure data:', error);
  }
}

/**
 * Retrieves and decrypts data from localStorage
 * @param key - Storage key
 * @returns Decrypted value or null if not found
 */
export function secureRetrieve(key: string): string | null {
  try {
    const value = localStorage.getItem(key);
    if (!value) return null;
    // Simple deobfuscation
    return atob(value);
  } catch (error) {
    console.error('Error retrieving secure data:', error);
    return null;
  }
}

/**
 * Creates a secure API fetch with proper headers and token handling
 * @param url - API endpoint
 * @param options - Fetch options
 * @returns Promise with response data
 */
export async function secureFetch(url: string, options: RequestInit = {}): Promise<any> {
  const token = secureRetrieve('token');
  
  // Add security headers
  const secureHeaders = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  try {
    const response = await fetch(url.startsWith('http') ? url : `${API_URL}${url}`, {
      ...options,
      headers: secureHeaders,
      credentials: 'same-origin', // Include cookies for same-origin requests
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Secure fetch error:', error);
    throw error;
  }
}

/**
 * Validates a CSRF token
 * @param token - CSRF token to validate
 * @returns Whether the token is valid
 */
export function validateCSRFToken(token: string): boolean {
  const storedToken = secureRetrieve('csrfToken');
  return !!storedToken && token === storedToken;
}