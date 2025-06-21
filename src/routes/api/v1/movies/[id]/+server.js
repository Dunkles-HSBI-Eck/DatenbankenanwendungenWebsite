import { getMovieById } from '$lib/server/database.js';
import { getMoviePriceForUser } from '$lib/server/database.js';
import { json } from '@sveltejs/kit';

export async function GET({ params, locals }) {
    const movieId = params.id;

    let price = [];
    if (!locals.userId) {
        price = await getMoviePriceForUser(null, movieId);
    }
    else{
        price = await getMoviePriceForUser(locals.userId, movieId);
    }
    const result = await getMovieById(movieId);

    if (!result) {
        return new Response('Movie not found', { status: 404 });
    }

    return json({
        id: result.movie_id,
        title: result.name,
        original_title: result.original_name,
        release: result.release,
        cover: result.cover,
        banner: result.banner,
        description: result.description,
        fsk_id: result.fsk_id,
        fsk: result.fsk_name,
        price: result.price,
        final_price: price[0]?.final_price,
        video: result.video,
        length: result.length,
        imdb_id: result.imdb_id,
        tmdb_id: result.tmdb_id,
        genres: result.genres || [],
        directors: result.directors || [],
        writers: result.writers || [],
        actors: result.actors || [],
        available_licenses: result.available_licenses,
    });
}