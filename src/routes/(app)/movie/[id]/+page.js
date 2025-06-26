export async function load({ params, fetch }) {
	const response = await fetch(`/api/v1/movies/${params.id}`);
	const movie = await response.json();
	let ownsMovie = false;
	let isLoggedIn;
	const response2 = await fetch('/api/v1/borrowedMovies');
	const data = await response2.json();
	if (response2.status == 401) {
		ownsMovie = false;
		isLoggedIn = false;
	} else {
		isLoggedIn = true;
		// Map API data to table format
		const BorrowedTableData = data.movies.map((m) => m.id);
		for (let i = 0; i < BorrowedTableData.length; i++) {
			if (BorrowedTableData[i] == params.id) {
				ownsMovie = true;
			}
		}
	}
	let reservationAvalable = false;
	let reservedMovie = false;
	const response3 = await fetch("/api/v1/reservations");
	const reserveData = await response3.json();
	if(response3.status == 401){
		reservedMovie = false;
	}
	else{
		for(let i = 0; i < reserveData.reservations.length; i++)
		{
			if(reserveData.reservations[i].id == params.id)
			{
				if(reserveData.reservations[i].status)
				{
					reservationAvalable = true;
				}
				reservedMovie = true;
				break;
			}
		}
	}

	return {
		movieId: params.id,
		movie,
		ownsMovie,
		isLoggedIn,
		reservedMovie,
		reservationAvalable
	};
}
