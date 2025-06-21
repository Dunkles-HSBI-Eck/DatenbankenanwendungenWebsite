
export async function load({ params, fetch }) {
    console.log("1st request");
    const response = await fetch(`/api/v1/movies/${params.id}`);
    const movie = await response.json();
    let ownsMovie = false;
    console.log("2nd request");
    const response2 = await fetch('/api/v1/borrowedMovies');
		const data = await response2.json();
		// Map API data to table format
		const BorrowedTableData = data.movies.map(m => m.id);
        for(let i = 0; i < BorrowedTableData.length; i++)
        {
            if(BorrowedTableData[i] == params.id)
            {
                ownsMovie = true;
                
            }
        }
        
    return {
        movieId: params.id,
        movie,
        ownsMovie
    };
}