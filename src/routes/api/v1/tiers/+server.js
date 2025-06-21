import { json } from '@sveltejs/kit';
import { getTiers } from '$lib/server/database.js';

export async function GET() {
    const result = await getTiers();

    return json({
        tiers: result.map((tier) => ({
            id: tier.tier_id,
            name: tier.name,
            price: tier.price,
            discount: tier.discount
        }))
    });
}
