import { reserveMovie } from '$lib/server/database.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {

	let { movieId } = await request.json();

	if (!locals.userId) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	} 
	const result = await reserveMovie(locals.userId, movieId);

	if (!result) {
		return new Response('Movie not found', { status: 404 });
	}

	return json({
		status: result.success,
		message: result.message
	});
}
