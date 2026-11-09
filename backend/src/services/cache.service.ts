const store = new Map<string, { value: string; expiresAt: number | null }>();

export const cacheService = {
  async get(key: string): Promise<string | null> {
    const hit = store.get(key);
    if (!hit) return null;
    if (hit.expiresAt && hit.expiresAt <= Date.now()) {
      store.delete(key);
      return null;
    }
    return hit.value;
  },
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    store.set(key, {
      value,
      expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null,
    });
  },
  async del(key: string): Promise<void> {
    store.delete(key);
  },
  async clear(): Promise<void> {
    store.clear();
  },
};
