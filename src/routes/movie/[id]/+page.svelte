<script>
	import TagCard from './TagCard.svelte';
	import { TvMinimalPlay } from '@lucide/svelte';
	import { Undo2 as ReturnIcon } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import TopBar from './TopBar.svelte';
	
	let {data} = $props();
	let { movieId } = data;

	let title = $state();
	let thumbnailSrc = $state();
	let description = $state();
	let preis = $state()
	let licencesAvalable = $state();
	let amountDays = $state();
	let year = $state();
	let tags = $state();
	let length = $state();
	let userOwnsMovie = $state();
	let cast = $state();
	 
	let focusOnLoad;

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
	async function fetchMovieInfos() {
		const response = await fetch(`/api/v1/movies/${movieId}`);
		let movie = await response.json();
		console.log(movie);
		title = movie.title;
		thumbnailSrc = `/api/v1/images/banners/${movie.banner}`;
		description = movie.description;
		preis = movie.price;
		year = movie.release;
		tags = movie.genres;
		licencesAvalable = movie.available_licenses;
		
		// Example: combine cast categories
		cast = [
			{ task: "Directors", name: movie.directors },
			{ task: "Writers", name: movie.writers },
			{ task: "Actors", name: movie.actors }
		];
	}


	onMount(() => {
		fetchMovieInfos();
		focusOnLoad.scrollIntoView();
		console.log(data);
		console.log(movieId);
	});

	
</script>
<TopBar profilePic="/Logo.png" data={data} />
<main>
	<div>
		<img src={thumbnailSrc} alt="thumbnail" class="w-full fixed -z-30" />
	</div>

	<div class = " z-40 w-250 flex pt-200 pl-10">
		<div class = "bg-surface-900 w-full items-baseline rounded p-10 border-surface-800 border shadow-2xl shadow-surface-950">	
			<h1 class="font-medium text-secondary-500 text-8xl m-1">{title}</h1>
			<br>
			<p class="font-medium text-2xl text-secondary-500">{year}</p>
			<br>
			<p class="font-medium text-2xl bottom-1 text-secondary-500">{description}</p>
			<div class="w-full flex">
				{#each tags as tag}
					<TagCard name={tag} class="flex"/>
				{/each}
				
			</div>
		</div>
	</div>
	<div class = "w-full  h-100 z-50 flex bg-surface-900 mt-10 p-10 rounded border border-surface-800">

		<div class = "h-full mr-10 text-secondary-500">
			<p class = "">licences avalable: {licencesAvalable}</p>
			<p>movie length: {formatTime(length)}</p>
			<br>
			{#each cast as category}
				<p> <strong>{category.task}</strong>:
					{#each category.name as castmember}
						{castmember} <br>
						
					{/each}
				</p>
				
			{/each}
		</div>
		{#if userOwnsMovie}

			<button bind:this={focusOnLoad}
				class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 h-27 rounded-xl shadow-md focus:ring-2"
			>
				<p class="flex">Watch now</p><TvMinimalPlay class="flex"/>
			</button>
			<button bind:this={focusOnLoad}
				class="btn btn-lg btn-block text-secondary-400 bg-surface-900 focus:ring-secondary-300 h-27 rounded-xl shadow-md focus:ring-2 ml-10 transition-colors duration-150 hover:underline"
			>
				<p class="flex">return movie</p><ReturnIcon class="flex"/>
			</button>
		{:else}
		{#if licencesAvalable > 0}
			<button bind:this={focusOnLoad}
				class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 h-27 rounded-xl shadow-md focus:ring-2"
			>
				<p>rent movie for {amountDays} days</p>
				<p> for {preis}</p>
			</button>
		{:else}
			<button bind:this={focusOnLoad}
				class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 h-27 rounded-xl shadow-md focus:ring-2"
			>
				<p>make a reservation</p>
			</button>
		{/if}
		{/if}
			
	</div>
	
</main>
