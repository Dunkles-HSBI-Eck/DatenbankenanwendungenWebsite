import { updateTier } from '$lib/server/database.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {

	let { tierId } = await request.json();

	if (!locals.userId) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	} 
	if (tierId === undefined || tierId === null) {
		return json({ error: 'Invalid tier ID' }, { status: 400 });
	}
	
	const result = await updateTier(locals.userId, tierId);

	if (!result) {
		return new Response('tier not updated', { status: 404 });
	}

	return json({
		status: 200
	});
}
