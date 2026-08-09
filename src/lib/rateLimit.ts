/**
 * Minimal in-memory rate limiter, keyed by IP.
 *
 * This is intentionally simple for the MVP: it lives in module memory, so it
 * resets on redeploy and does not share state across multiple server
 * instances. That's a fine trade-off for a single-instance MVP deployment;
 * swap in Redis (e.g. Upstash) behind this same function signature before
 * scaling to multiple instances.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 8;

export function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + WINDOW_MS;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt };
  }

  if (existing.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - existing.count, resetAt: existing.resetAt };
}

export function getClientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
