import { json } from '@sveltejs/kit';
import { getMovies } from '$lib/server/database.js';

export async function GET({ url }) {
	let last_id = url.searchParams.get('last_id') || null;
	const page_size = Math.min(parseInt(url.searchParams.get('page_size')) || 10, 100);
    const search = url.searchParams.get('search') || '';
    const order_by = url.searchParams.get('order_by') || 'id';
    const order = url.searchParams.get('order') || 'asc';
    const genres = url.searchParams.get('genres')?.split(',') || [];

    if( !['id', 'release', 'alphabetical'].includes(order_by)) {
        return json({ error: 'Invalid order_by parameter' }, { status: 400 });
    }

    if( !['asc', 'desc'].includes(order)) {
        return json({ error: 'Invalid order parameter' }, { status: 400 });
    }

    // Validate genres
    if (genres.length > 0) {
        const validGenres = genres.every(genre => !isNaN(parseInt(genre)));
        if (!validGenres) {
            return json({ error: 'Invalid genres parameter' }, { status: 400 });
        }
    }

	// Get the movies from the database
	const result = await getMovies(last_id, page_size, search, order_by, order, JSON.stringify(genres));

    let resultLastId = null;
    switch (order_by) {
        case 'release':
            resultLastId = result.movies?.length ? result.movies[result.movies.length - 1].release : null; 
            break;
        case 'alphabetical':
            resultLastId = result.movies?.length ? result.movies[result.movies.length - 1].name : null;
            break;
        default:
            resultLastId = result.movies?.length ? result.movies[result.movies.length - 1].movie_id : null;
            break;
    }

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
        last_id: resultLastId
	});
}
