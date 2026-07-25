import { Redis } from "@upstash/redis";

export function isRedisConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN &&
      !process.env.UPSTASH_REDIS_REST_URL.includes("your-upstash-instance")
  );
}

export const redis = isRedisConfigured()
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;
