import { json } from '@sveltejs/kit';
import { getTier } from '$lib/server/database.js';

export async function GET( { locals } ) {

    if (!locals.userId) {
        return json({ error: 'Not authenticated' }, { status: 401 });
    }

    const result = await getTier(locals.userId);

    return json({
        tiers: result.map((tier) => ({
        current_tier: tier.tier_id
        }))
    });
}
