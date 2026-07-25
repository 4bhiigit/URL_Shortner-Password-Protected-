import { Redis } from "@upstash/redis";

function getCleanEnv(val?: string): string {
  if (!val) return "";
  // Trim whitespace and if multiple lines exist, take only the first line
  return val.trim().split(/[\r\n]+/)[0].trim();
}

const rawUrl = getCleanEnv(process.env.UPSTASH_REDIS_REST_URL);
const rawToken = getCleanEnv(process.env.UPSTASH_REDIS_REST_TOKEN);

export function isRedisConfigured(): boolean {
  return Boolean(
    rawUrl &&
      rawToken &&
      !rawUrl.includes("your-upstash-instance")
  );
}

export const redis = isRedisConfigured()
  ? new Redis({
      url: rawUrl,
      token: rawToken,
    })
  : null;
