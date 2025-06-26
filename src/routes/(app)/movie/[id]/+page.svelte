<script>
	import TagCard from './TagCard.svelte';
	import { TvMinimalPlay } from '@lucide/svelte';
	import { Undo2 as ReturnIcon } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { lastMovie } from '$lib/store.js';
	import BorrowWindow from '$lib/BorrowWindow.svelte';
	import { Check as CheckmarkIcon } from '@lucide/svelte';


	let { data } = $props();
	let { movieId, movie, ownsMovie, isLoggedIn, reservedMovie, reservationAvalable } = data;
	let UserOwnsMovie = $state(ownsMovie);
	let UserReservedMovie = $state(reservedMovie);
	let cast = $state();
	let showBorrowWindow = $state(false);
	cast = [
		{ task: 'Director', people: movie.directors },
		{ task: 'Actors', people: movie.actors },
		{ task: 'Writers', people: movie.writers }
	];

	let focusOnLoad = $state();

	function formatTime(seconds) {
		seconds = Math.floor(seconds);
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;

		if (hours > 0) {
			return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
		}

		return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
	}

	onMount(() => {
		lastMovie.set(movie);
		focusOnLoad.scrollIntoView();
	});

	function cancelBorrowing() {
		showBorrowWindow = false;
	}

	async function reserveMovie()
	{
		const reserveRespond = await fetch('/api/v1/reservations/reserve', {
			method: 'POST',
			body: JSON.stringify({
				movieId: movieId
			})
		});
		if(reserveRespond.ok)
		{
			UserReservedMovie = true;
		}
	}

	async function returnMovie() {
		const returnRespond = await fetch('/api/v1/movies/return', {
			method: 'POST',
			body: JSON.stringify({
				movieId: movieId
			})
		});
		if(returnRespond.ok){
			UserOwnsMovie = false;
		}
	}

	async function openBorrowWindow() {
		showBorrowWindow = true;
	}

	async function confirmBorrowing() {
		const rentRespond = await fetch('/api/v1/movies/rent', {
			method: 'POST',
			body: JSON.stringify({
				movieId: movieId
			})
		});
		showBorrowWindow = false;
		if(rentRespond.ok)
		{
			UserOwnsMovie = true;
		}
	}

	function convertToPrice(number){
		let string = number.toString();
		let dot = string.indexOf(".");
		if(dot == -1){
			return string + ".00€";
		}
		else{
			if(dot + 3 > string.length){
				string = string + "0";
				if(dot + 3 > string.length){
					string = string + "0"
				}
			}
			return string.substring(0, dot +3) + "€";
		}
	}

</script>

{#if showBorrowWindow}
	<BorrowWindow movieTitle={movie.title} cancelFunction={cancelBorrowing} price={movie.final_price} confirmFunction={confirmBorrowing}/>
{/if}

<div class=" -z-30 -mt-12 h-[50rem] w-screen overflow-hidden">
	<img
		src="/api/v1/images/banners/{movie.banner}"
		alt="thumbnail"
		class="w-full object-cover brightness-75"
	/>
</div>

<div
	class=" bottom bg-surface-900 border-surface-800 relative bottom-0 z-40 flex h-150 w-full rounded border p-10"
>
	<div class=" absolute bottom-[38.5rem] -left-10 z-40 flex w-250 pt-20 pl-10">
		<div
			bind:this={focusOnLoad}
			class="bg-surface-900 border-surface-800 shadow-surface-950 w-full items-baseline rounded border p-10 shadow-2xl"
		>
			<h1 class="text-secondary-500 m-1 text-xl font-medium">{movie.title}</h1>
			<br />
			<p class="text-secondary-500 font-medium">{movie.release}</p>
			<br />
			<p class="text-secondary-500 bottom-1 font-medium">{movie.description}</p>
			<div class="flex w-full">
				{#each movie.genres as genre}
					<TagCard name={genre.name} class="flex" />
				{/each}
			</div>
		</div>
	</div>

	<div class="text-secondary-500 mr-10 h-full text-xs">
		<p class="">licences avalable: {movie.available_licenses}</p>
		<p>movie length: {formatTime(movie.length)}</p>
		<br />
		{#each cast as category}
			<p>
				<strong>{category.task}</strong>:
				<br />
				{#each category.people as castmember}
					{castmember.name} <br />
				{/each}
				<br />
			</p>
		{/each}
	</div>
	{#if isLoggedIn}
		{#if UserOwnsMovie}
			<a href="/watch"
				><div
					class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 h-27 rounded-xl shadow-md focus:ring-2"
				>
					<p class="flex">Watch now</p>
					<TvMinimalPlay class="flex" />
				</div></a
			>
			<button
			onclick={returnMovie}
				class="btn btn-lg btn-block text-secondary-400 bg-surface-900 focus:ring-secondary-300 ml-10 h-27 rounded-xl shadow-md transition-colors duration-150 hover:underline focus:ring-2"
			>
				<p class="flex">return movie</p>
				<ReturnIcon class="flex" />
			</button>
		{:else if movie.available_licenses > 0 || reservationAvalable}
			<div>
			<button
				onclick={openBorrowWindow}
				class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 h-27 rounded-xl shadow-md focus:ring-2"
			>
				<p>rent movie for 14 days</p>
				{#if movie.price == movie.final_price}
				<p>for {movie.final_price}€</p>
				{:else}
				<p>for <strike class="text-secondary-700">{convertToPrice(movie.price)}</strike> <strong> {convertToPrice(movie.final_price)}</strong></p>
				{/if}
			</button>
			{#if reservationAvalable}
			
			<p class="pt-5 text-secondary-500">Because of your reservation this movie is avalable to you.</p>
			{/if}
			</div>
		{:else}
			
			{#if UserReservedMovie}
				<div
				class="btn btn-lg btn-block border-surface-800 text-secondary-400 bg-surface-900 h-27 rounded-xl shadow-md"
				>
					<p>reserved</p><CheckmarkIcon/>
				</div>
				<p class="text-secondary-400 p-10">You will be notified if this movie becomes avalable again.</p>
			{:else}
				<button
				class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 h-27 rounded-xl shadow-md focus:ring-2"
				onclick={reserveMovie}
				>
				<p>make a reservation</p>
				</button>
			{/if}	
		
		
			
		{/if}
	{:else}
		<div class="text-secondary-500 p-10">
			<p class="text-secondary-500">
				To watch this movie please log in to your account or create a new one
			</p>
			<br />
			<div class="flex w-[12.5rem] justify-end gap-1">
				<a
					href="/register"
					class="btn btn-lg hover:ring-secondary-300 h-12 w-24 rounded-lg hover:scale-105"
					>Register</a
				>
				<a href="/login" class="btn btn-lg bg-primary-500 h-12 w-24 rounded-lg hover:scale-105"
					>Login</a
				>
			</div>
		</div>
	{/if}
</div>
