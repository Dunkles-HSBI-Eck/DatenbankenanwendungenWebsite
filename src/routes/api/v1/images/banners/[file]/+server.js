import { getObject } from '$lib/server/objectStorage.js';
import { error } from '@sveltejs/kit';

export async function GET({ params }) {
    const { file } = params;

    if (!file) {
        error(400, 'File parameter is required');
    }

    try {
        const stream = await getObject('banners', file);
        return new Response(stream, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=31536000' // Cache for 1 year
            }
        });
    } catch {
        error(404, `Banner image ${file} not found`);
    }
}