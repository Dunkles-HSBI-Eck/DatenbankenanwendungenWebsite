import { addRequest } from '$lib/server/database.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {

	let { message } = await request.json();

	if (!locals.userId) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	} 
	const result = await addRequest(locals.userId, message);

	if (!result) {
		return new Response('failed to add request', { status: 404 });
	}

	return json({
		status: 200
	});
}
