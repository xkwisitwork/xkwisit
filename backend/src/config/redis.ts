/**
 * Redis is optional in local/dev. This stub keeps import sites typed
 * without requiring a live Redis connection.
 */
export type RedisLike = {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode?: string, ttl?: number): Promise<unknown>;
  del(key: string): Promise<number>;
};

let client: RedisLike | null = null;

export function getRedis(): RedisLike | null {
  return client;
}

export function setRedisForTests(mock: RedisLike | null) {
  client = mock;
}
