/**
 * lib/redis.js — Upstash Redis client singleton
 *
 * Uses @upstash/redis (REST-based) instead of ioredis (TCP-based).
 * Upstash REST works in any environment — serverless, edge, Node.js.
 *
 * Required env vars:
 *   UPSTASH_REDIS_REST_URL   — e.g. https://xxx.upstash.io
 *   UPSTASH_REDIS_REST_TOKEN — your Upstash token
 *
 * API is identical to ioredis for basic ops (get, set, incr, decr).
 * Pipeline: exec() returns values directly (not [err, val] tuples).
 */
import { Redis } from '@upstash/redis';

// Singleton: reuse the same client across hot-reloads in dev
if (!global._redis) {
    global._redis = new Redis({
        url:   process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
}

const redis = global._redis;
export default redis;
