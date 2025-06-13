import { createClient } from '@redis/client';
import { env } from '$env/dynamic/private';

const redisClient = createClient({
    username: env.REDIS_USERNAME,
    password: env.REDIS_PASSWORD,
    socket: {
        host: env.REDIS_IP,
        port: env.REDIS_PORT
    }
});

redisClient.on('error', (error) => {
    console.error(`Redis client error:`, error);
});

await redisClient.connect();

/**
 * Rate limit function to prevent excessive requests to a specific endpoint.
 *
 * @param {String} user User identifier (e.g., user ID or IP address)
 * @param {String} endpoint Specific endpoint being accessed
 * @param {Number} timeLimit Milliseconds for the rate limit
 * @returns {Promise<Boolean>} true if rate limit is exceeded, false otherwise
 */
export async function rateLimit(user, endpoint, timeLimit = 500) {
    const response = await redisClient.set(`rate_limit:${user}:${endpoint}`, '', {
        PX: timeLimit,
        NX: true
    });

    return !response;
}

/**
 * Leaky bucket rate limit to control the rate of requests over a time window.
 *
 * @param {String} user User identifier (e.g., user ID or IP address)
 * @param {Number} maxRequests Maximum number of requests allowed in the time window
 * @param {Number} timeWindow Time window in seconds for the leaky bucket algorithm
 * @returns {Promise<Boolean>} true if rate limit is exceeded, false otherwise
 */
export async function leakyRateLimit(user, maxRequests, timeWindow) {
    const key = `leaky_rate_limit:${user}`;
    const now = Date.now();

    // Get current state from Redis
    const data = await redisClient.hGetAll(key);
    const lastLeak = data.last_leak_time ? parseInt(data.last_leak_time) : now;
    const tokens = data.tokens ? parseFloat(data.tokens) : 0;

    // Calculate how many tokens have leaked out
    const elapsed = (now - lastLeak) / 1000;
    const leakRate = maxRequests / timeWindow;
    const updatedTokens = Math.max(0, tokens - elapsed * leakRate);

    if (updatedTokens >= maxRequests) return true;

    // Save updated state
    await redisClient.hSet(key, {
        tokens: updatedTokens + 1,
        last_leak_time: now
    });

    // Set expiry to auto-cleanup
    await redisClient.expire(key, Math.ceil(timeWindow * 2));

    return false;
}
