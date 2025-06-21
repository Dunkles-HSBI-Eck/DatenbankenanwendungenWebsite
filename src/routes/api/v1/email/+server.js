import { json } from '@sveltejs/kit';
import { getEmail } from '$lib/server/database.js';

export async function GET( { locals } ) {

    if (!locals.userId) {
        return json({ error: 'Not authenticated' }, { status: 401 });
    }

    const result = await getEmail(locals.userId);

    return json({
        email: result[0]?.email ?? null
    });
}
