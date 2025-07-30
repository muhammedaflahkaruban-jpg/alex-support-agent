// This is a placeholder for a cache service.
// In a real application, you might use Redis (e.g., Upstash Redis) or a similar caching solution.

interface CacheService {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>
  delete(key: string): Promise<void>
}

class InMemoryCacheService implements CacheService {
  private cache = new Map<string, { value: any; expiry: number | null }>()

  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key)
    if (!entry) {
      return null
    }
    if (entry.expiry && Date.now() > entry.expiry) {
      this.delete(key) // Expired
      return null
    }
    return entry.value as T
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const expiry = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null
    this.cache.set(key, { value, expiry })
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key)
  }
}

export const cacheService: CacheService = new InMemoryCacheService()

// Example usage:
// await cacheService.set('my-data', { foo: 'bar' }, 60); // Cache for 60 seconds
// const data = await cacheService.get('my-data');
