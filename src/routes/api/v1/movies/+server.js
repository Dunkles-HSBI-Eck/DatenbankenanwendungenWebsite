import { json } from '@sveltejs/kit';
import { getMovies } from '$lib/server/database.js';

export async function GET({ url }) {
	const last_id = parseInt(url.searchParams.get('last_id')) || -1;
	const page_size = Math.min(parseInt(url.searchParams.get('page_size')) || 10, 100);

	// Get the movies from the database
	const result = await getMovies(last_id, page_size);

	return json({
		movies:
			result.movies?.map((movie) => ({
				id: movie.movie_id,
				title: movie.name,
				original_title: movie.original_name,
				release: movie.release,
				cover: movie.cover
			})) || [],
		has_more: result.has_more,
		last_id: result.movies?.length > 0 ? result.movies[result.movies.length - 1].movie_id : null
	});
}
