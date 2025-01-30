import { Injectable, Inject } from "@nestjs/common";
import { Redis as RedisClient } from "ioredis";

@Injectable()
export class CacheService {
  constructor(@Inject("REDIS_CLIENT") private readonly client: RedisClient) {}

  private safeParseJson<T>(jsonString: string): T {
    try {
      const parsedValue = JSON.parse(jsonString) as T;
      if (typeof parsedValue !== "object" || parsedValue === null) {
        throw new Error("Parsed value is not an object");
      }
      return parsedValue;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to parse JSON`);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    if (!value) return null;
    return this.safeParseJson<T>(value);
  }

  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    await this.client.set(key, JSON.stringify(value), "EX", ttl);
  }
}
