import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export async function hashPassword(password, salt = null) {
	if (!salt) {
		salt = Array.from(crypto.getRandomValues(new Uint8Array(16)))
			.map((b) => b.toString(36).padStart(2, '0'))
			.join('');
	}

	const encoder = new TextEncoder();
	const passwordBuffer = encoder.encode(password + salt);
	const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
	const hash = Array.from(new Uint8Array(hashBuffer))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');

	return { hash, salt };
}

export async function createJWT(user_id) {
	const token = await jwt.sign({ user_id }, JWT_SECRET, {
		expiresIn: '30d'
	});

	return token;
}

export async function verifyJWT(token) {
	try {
		const decoded = await jwt.verify(token, JWT_SECRET);
		return decoded.user_id;
	} catch (error) {
		console.error('JWT verification failed:', error);
		return null;
	}
}
