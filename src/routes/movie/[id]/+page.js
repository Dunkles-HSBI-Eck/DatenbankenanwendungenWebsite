
export async function load({ params, fetch }) {
    const response = await fetch(`/api/v1/movies/${params.id}`);
    const movie = await response.json();

    return {
        movieId: params.id,
        movie
    };
}