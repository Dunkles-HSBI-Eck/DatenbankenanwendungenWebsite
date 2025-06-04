import { error } from '@sveltejs/kit';
import { hashPassword } from '$lib/server/password.js';
import { getSaltByEmail, verifyUser } from '$lib/server/database.js';
import { NoUserFound } from '$lib/server/error.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export async function POST({ request }) {
    const { email, password } = await request.json();

    let salt;
    try {
        salt = await getSaltByEmail(email);
    } catch (e) {
        if (e instanceof NoUserFound) {
            error(e.status, "Credentials are incorrect");
        }
        error(e.status, 'Internal server error');
    }

    const { hash } = await hashPassword(password, salt);

    try {
        await verifyUser(email, hash);
    } catch (e) {
        if (e instanceof NoUserFound) {
            error(e.status, "Credentials are incorrect");
        }
        error(e.status, 'Internal server error');
    }

    const token = await jwt.sign({ email }, JWT_SECRET, {
        expiresIn: '30d'
    });

    return new Response(null, {
        headers: {
            'Set-Cookie': `jwt=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 30}; Secure;`
        }
    });
}