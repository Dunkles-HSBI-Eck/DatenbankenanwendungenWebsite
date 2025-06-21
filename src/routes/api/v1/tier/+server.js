import { json } from '@sveltejs/kit';
import { getTier } from '$lib/server/database.js';

export async function GET({ locals }) {
	if (!locals.userId) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}

	const result = await getTier(locals.userId);

	return json({
		id: result[0]?.tier_id ?? null,
		name: result[0]?.name ?? null
	});
}
