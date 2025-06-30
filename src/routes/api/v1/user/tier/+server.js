import { json } from '@sveltejs/kit';
import { getTier, updateTier } from '$lib/server/database.js';

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

export async function POST({ request, locals }) {

    let { tierId } = await request.json();

    if (!locals.userId) {
        return json({ error: 'Not authenticated' }, { status: 401 });
    } 
    if (tierId === undefined || tierId === null) {
        return json({ error: 'Invalid tier ID' }, { status: 400 });
    }
    
    const result = await updateTier(locals.userId, tierId);

    if (!result) {
        return new Response('tier not updated', { status: 404 });
    }

    return json();
}