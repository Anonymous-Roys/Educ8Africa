// LRU Cache implementation for performance optimization
class CacheManager {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.accessTime = new Map();
  }

  get(key) {
    const item = this.cache.get(key);
    if (item) {
      // Check if expired
      if (item.expires && Date.now() > item.expires) {
        this.cache.delete(key);
        this.accessTime.delete(key);
        return null;
      }
      
      this.accessTime.set(key, Date.now());
      return item.value;
    }
    return null;
  }

  set(key, value, ttl = 5 * 60 * 1000) { // 5 minutes default TTL
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    this.cache.set(key, {
      value,
      expires: ttl ? Date.now() + ttl : null
    });
    this.accessTime.set(key, Date.now());
  }

  evictLRU() {
    let oldestKey = null;
    let oldestTime = Date.now();

    for (let [key, time] of this.accessTime) {
      if (time < oldestTime) {
        oldestTime = time;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.accessTime.delete(oldestKey);
    }
  }

  has(key) {
    return this.cache.has(key) && !this.isExpired(key);
  }

  isExpired(key) {
    const item = this.cache.get(key);
    return item && item.expires && Date.now() > item.expires;
  }

  clear() {
    this.cache.clear();
    this.accessTime.clear();
  }

  size() {
    return this.cache.size;
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      usage: (this.cache.size / this.maxSize) * 100
    };
  }
}

export const cache = new CacheManager();
export default CacheManager;
