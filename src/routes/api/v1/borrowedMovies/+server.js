import { json } from '@sveltejs/kit';
import { getBorrowedMovies } from '$lib/server/database.js';

export async function GET({ locals }) {
	// locals.userId is automatically available if set in hooks.server.js
	if (!locals.userId) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}
	const result = await getBorrowedMovies(locals.userId);

	return json({
		movies:
			result?.map((movie) => {
				const today = new Date();
				const until = new Date(movie.rented_until);
				const daysLeft = Math.max(0, Math.ceil((until - today) / (1000 * 60 * 60 * 24)));
				return {
					id: movie.movie_id,
					name: movie.name,
					rentalDate: new Date(movie.rental_date).toLocaleDateString('de-DE'),
					timeLeft: daysLeft
				};
			}) || []
	});
}
