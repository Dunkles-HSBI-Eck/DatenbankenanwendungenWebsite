import { rentMovie } from '$lib/server/database.js';
import { json } from '@sveltejs/kit';

export async function GET({ params, locals }) {
    const movieId = params.id;

	if (!locals.userId) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	} 
	const result = await rentMovie(locals.userId, movieId);

    if (!result.success) {
        return json({ error: result.message }, { status: 400 });
    }

	return json();
}
