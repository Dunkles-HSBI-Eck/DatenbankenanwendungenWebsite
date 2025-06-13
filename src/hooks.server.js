import { leakyRateLimit, rateLimit } from '$lib/server/redis.js';
import { verifyJWT } from '$lib/server/authentication.js';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const rateLimitRoutes = JSON.parse(env.RATE_LIMITER_ROUTES || '[]').map((route) => {
    return {
        route: route.route,
        limit: Number.parseInt(route.limit)
    };
});

export async function handle({ event, resolve }) {
    if (!event.route.id) {
        return error(404, 'Site not found');
    }

    // Identify the user based on JWT token or IP address
    event.locals.userIp = event.getClientAddress();
    const token = event.cookies.get('jwt');

    if (token) {
        const userId = await verifyJWT(token);

        if (userId) {
            event.locals.userId = userId;
        }
    }

    // Apply rate limiting if enabled
    if (env.RATE_LIMITER_ENABLED === 'true') {
        await globalRateLimiter(event);
        await routesRateLimiter(event);
    }

    return await resolve(event);
}

/**
 * Checks if the global rate limit is exceeded for the user.
 * Returns a 429 error if the limit is exceeded.
 * This function uses a leaky bucket algorithm to allow a burst of requests.
 *
 * @param {RequestEvent} event Event object containing request details
 * @return {Promise<void>} Throws an error to the user if the global rate limit is exceeded
 */
async function globalRateLimiter(event) {
    const rateLimitExceeded = await leakyRateLimit(
        event.locals.userId || event.locals.userIp,
        env.RATE_LIMITER_GLOBAL_LIMIT,
        env.RATE_LIMITER_GLOBAL_WINDOW
    );

    if (rateLimitExceeded) {
        throw error(429, 'Global rate limit exceeded');
    }
}

/**
 * Checks if the route-specific rate limit is exceeded for the user.
 * Returns a 429 error if the limit is exceeded.
 *
 * @param {RequestEvent} event Event object containing request details
 * @returns {Promise<void>} Throws an error to the user if the route-specific rate limit is exceeded
 */
async function routesRateLimiter(event) {
    for (const route of rateLimitRoutes) {
        if (!event.route.id.startsWith(route.route)) continue;

        const rateLimitExceeded = await rateLimit(
            event.locals.userId || event.locals.userIp,
            event.route.id,
            route.limit
        );

        if (rateLimitExceeded) {
            throw error(429, 'Rate limit exceeded');
        }

        break;
    }
}
