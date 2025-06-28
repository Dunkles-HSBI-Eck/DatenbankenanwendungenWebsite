import { json } from '@sveltejs/kit';
import { getGenres } from '$lib/server/database.js';

export async function GET() {
    const result = await getGenres();

    return json(
        result.genres?.map((genre) => ({
            id: genre.id,
            name: genre.name
        })) || []
    );
}
