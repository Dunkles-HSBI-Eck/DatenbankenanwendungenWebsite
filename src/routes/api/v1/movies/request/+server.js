import { addRequest } from '$lib/server/database.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {

	let { message } = await request.json();

	if (!locals.userId) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	} 
	await addRequest(locals.userId, message);

	return json();
}
