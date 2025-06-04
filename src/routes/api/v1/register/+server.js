import { error } from '@sveltejs/kit';
import { registerUser } from '$lib/server/database.js';
import { hashPassword, createJWT } from '$lib/server/authentication.js';

const REGEX_EMAIL = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one uppercase, one lowercase, one number

export async function POST({ request }) {
    const { email, password } = await request.json();

    // Check if email and password are provided
    if (!email || !password) {
        error(400, 'Email and password are required');
    }

    // Validate email format
    if (!RegExp(REGEX_EMAIL).test(email)) {
        error(400, 'Invalid email format');
    }

    // Validate password format
    if (!RegExp(REGEX_PASSWORD).test(password)) {
        error(400, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
    }

    // Hash the password
    const { hash, salt } = await hashPassword(password);

    // Register user in the database
    let user_id;
    try {
        user_id = await registerUser(email, hash, salt);
    } catch {
        error(500, 'Internal server error while registering user');
    }

    return new Response(null, {
        headers: {
            'Set-Cookie': `jwt=${await createJWT(user_id)}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 30}; Secure;` // Set cookie with JWT
        }
    });
}