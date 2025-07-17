export async function load({ params, fetch }) {
	const response = await fetch(`/api/v1/movies/${params.id}`);
	const movie = await response.json();
	let ownsMovie = false;
	let isLoggedIn;
	const response2 = await fetch('/api/v1/user/rented');
	const data = await response2.json();
	
	//Check if User is logged in and owns the movie
	if (response2.status == 401) {
		ownsMovie = false;
		isLoggedIn = false;
	} else {
		isLoggedIn = true;
		const BorrowedTableData = data.map((m) => m.id);
		for (let i = 0; i < BorrowedTableData.length; i++) {
			if (BorrowedTableData[i] == params.id) {
				ownsMovie = true;
			}
		}
	}

	//Check if User has reserved the movie and if the reserved movie is avalable  
	let reservationAvalable = false;
	let reservedMovie = false;
	const response3 = await fetch("/api/v1/user/reservations");
	const reserveData = await response3.json();
	if(response3.status == 401){
		reservedMovie = false;
	}
	else{
		for(let i = 0; i < reserveData.length; i++)
		{
			if(reserveData[i].id == params.id)
			{
				if(reserveData[i].status)
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
