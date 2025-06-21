import { redirect } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
    if (locals.userId) {
        redirect(303,"/browse")
    }

    const response = await fetch('/api/v1/movies');

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    const movies = await response.json();
    return {
        movies: movies
    };
}