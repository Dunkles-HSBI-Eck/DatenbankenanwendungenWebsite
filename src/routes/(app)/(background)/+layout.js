export async function load({ fetch }) {
	const response = await fetch('/api/v1/movies');

	if (!response.ok) {
		throw new Error('Failed to fetch movies');
	}

	const movies = await response.json();
	return {
		movies: movies
	};
}
