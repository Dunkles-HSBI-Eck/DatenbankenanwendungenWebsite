import { error } from '@sveltejs/kit';
import { hashPassword, createJWT } from '$lib/server/authentication.js';
import { getSaltByEmail, verifyUser } from '$lib/server/database.js';
import { NoUserFound } from '$lib/server/error.js';

export async function POST({ request }) {
	let { email, password } = await request.json();

    email = email?.trim().toLowerCase();

	let salt;
	try {
		salt = await getSaltByEmail(email);
	} catch (e) {
		if (e instanceof NoUserFound) {
			error(e.status, 'Credentials are incorrect');
		}
		error(e.status, 'Internal server error');
	}

	const { hash } = await hashPassword(password, salt);

	let user_id;
	try {
		user_id = await verifyUser(email, hash);
	} catch (e) {
		if (e instanceof NoUserFound) {
			error(e.status, 'Credentials are incorrect');
		}
		error(e.status, 'Internal server error');
	}

	return new Response(
		JSON.stringify({
			user_id: user_id
		}),
		{
			headers: {
				'Set-Cookie': `jwt=${await createJWT(user_id)}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 30}; Secure;`
			}
		}
	);
}
