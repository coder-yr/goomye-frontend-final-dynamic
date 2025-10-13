/**
 * Cache management utilities
 * Provides efficient data caching with TTL support
 */

interface CacheItem<T> {
  value: T;
  expiry: number | null; // Timestamp when the item expires, null for no expiry
}

class CacheManager {
  private cache: Map<string, CacheItem<any>> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes in milliseconds

  /**
   * Set a value in the cache with optional TTL
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttl - Time to live in milliseconds (optional)
   */
  set<T>(key: string, value: T, ttl?: number): void {
    const expiry = ttl ? Date.now() + ttl : ttl === 0 ? null : Date.now() + this.defaultTTL;
    this.cache.set(key, { value, expiry });
  }

  /**
   * Get a value from the cache
   * @param key - Cache key
   * @returns Cached value or undefined if not found or expired
   */
  get<T>(key: string): T | undefined {
    const item = this.cache.get(key);
    
    // Return undefined if item doesn't exist
    if (!item) return undefined;
    
    // Check if item has expired
    if (item.expiry !== null && item.expiry < Date.now()) {
      this.cache.delete(key);
      return undefined;
    }
    
    return item.value as T;
  }

  /**
   * Check if a key exists in the cache and is not expired
   * @param key - Cache key
   * @returns Whether the key exists and is valid
   */
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    if (item.expiry !== null && item.expiry < Date.now()) {
      this.cache.delete(key);
      return false;
    }
    return true;
  }

  /**
   * Delete a key from the cache
   * @param key - Cache key
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all items from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Remove all expired items from the cache
   * @returns Number of items removed
   */
  cleanup(): number {
    const now = Date.now();
    let count = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry !== null && item.expiry < now) {
        this.cache.delete(key);
        count++;
      }
    }
    
    return count;
  }

  /**
   * Get or set a value with a callback if not in cache
   * @param key - Cache key
   * @param callback - Function to call if key not in cache
   * @param ttl - Time to live in milliseconds (optional)
   * @returns Cached or newly fetched value
   */
  async getOrSet<T>(key: string, callback: () => Promise<T>, ttl?: number): Promise<T> {
    const cachedValue = this.get<T>(key);
    if (cachedValue !== undefined) {
      return cachedValue;
    }
    
    const value = await callback();
    this.set(key, value, ttl);
    return value;
  }
}

// Export a singleton instance
export const cacheManager = new CacheManager();