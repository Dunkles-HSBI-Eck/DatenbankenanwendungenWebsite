import { returnMovie } from '$lib/server/database.js';
import { json } from '@sveltejs/kit';

export async function GET({ params, locals }) {
	const movieId = params.id;

	if (!locals.userId) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	} 
	await returnMovie(locals.userId, movieId);

	return json();
}
