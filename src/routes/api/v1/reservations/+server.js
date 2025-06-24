import { json } from '@sveltejs/kit';
import { getReservations } from '$lib/server/database.js';

export async function GET({ locals }) {
	if (!locals.userId) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}
	// Get the reservations from the database
	const result = await getReservations(locals.userId);

	console.log(result);

	return json({
		reservations:
			result?.map((reservation) => ({
				id: reservation.movie_id,
				title: reservation.movie_name,
				status: reservation.status === 'available'
			})) || []
	});
}
