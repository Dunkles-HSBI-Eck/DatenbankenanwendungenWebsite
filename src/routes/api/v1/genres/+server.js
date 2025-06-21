import { json } from '@sveltejs/kit';
import { getGenres } from '$lib/server/database.js';

export async function GET() {
	const result = await getGenres();

	return json({
		genres:
			result.genres?.map((genre) => ({
				id: genre.genre_id,
				name: genre.name,
				subId: genre.subgenre_id
			})) || []
	});
}
