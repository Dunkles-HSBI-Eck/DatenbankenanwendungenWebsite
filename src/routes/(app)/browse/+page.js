export async function load({ url, fetch }) {
    const searchString = url.searchParams.get('search');

    const response = await fetch(`/api/v1/movies?search=${encodeURIComponent(searchString || '')}&order_by=release&order=desc`);
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    const responseGenres = await fetch('/api/v1/genres');
    if (!responseGenres.ok) {
        throw new Error('Failed to fetch genres');
    }

    return {
        movies: await response.json(),
        genres: await responseGenres.json(),
        searchString: searchString || ''
    };
}