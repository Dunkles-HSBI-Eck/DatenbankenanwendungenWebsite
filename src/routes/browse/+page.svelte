<script>
	import PreviewCard from './PreviewCard.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let search = '';
	let filter = 'all';
	let profilePic = '/Logo.png';
	let isLoading = false;

	let lastid = 0;
	let page_size = 20;

	let cards = [];

	let filterOptions = [];
	let genres = [];

	// Debounce logic
	let debounceTimeout;
	let fetchId = 0;

	function getNewMovies() {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			cards = [];
			lastid = 0;
			fetchData();
		}, 300); // 300ms debounce
	}

	async function fetchData() {
		isLoading = true;
		const currentFetchId = ++fetchId;
		const params = new URLSearchParams({
			last_id: lastid,
			page_size: page_size
		});
		const response = await fetch(`/api/v1/movies?${params.toString()}`);
		const data = await response.json();
		// Only update if this is the latest fetch
		if (currentFetchId === fetchId) {
			const newCards = data.movies.map((movie) => ({
				id: movie.id,
				previewImage: movie.cover,
				name: movie.title
			}));
			cards = cards.concat(newCards);
			if (cards.length > 0) {
				lastid = cards[cards.length - 1].id;
			}
			isLoading = false;
		}
	}
	async function fetchGenres() {
		const response = await fetch('/api/v1/genres');
		const data = await response.json();
		genres = data.genres;
		filterOptions = [
			{ label: 'All', value: 'all' },
			...genres.map((genre) => ({ label: genre.name, value: genre.id }))
		];
	}

	onMount(() => {
		fetchGenres();
		fetchData();
	});
</script>

<header
	class="bg-surface/80 border-secondary-400 sticky top-0 z-10 mb-8 flex w-full items-center justify-between border-b px-2 backdrop-blur-md"
>
	<div class="mx-auto flex w-full max-w-lg items-center justify-center gap-3">
		<input
			type="text"
			placeholder="Search..."
			bind:value={search}
			on:input={getNewMovies}
			class="bg-surface text-secondary-400 placeholder:text-secondary-400 focus:ring-primary border-secondary w-full rounded-lg border px-4 py-2 shadow-sm transition-all duration-200 focus:ring-2 focus:outline-none"
		/>
		<select
			bind:value={filter}
			on:change={getNewMovies}
			class="bg-surface-800 text-secondary-400 border-secondary focus:ring-primary w-40 appearance-none rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:outline-none"
		>
			{#each filterOptions as option}
				<option value={option.value} class="text-secondary-400">{option.label}</option>
			{/each}
		</select>
	</div>
	<div class="flex h-20 items-center">
		<a
			href="/profile"
			class="focus:ring-primary mr-6 rounded-full focus:ring-2 focus:outline-none"
			aria-label="Go to profile"
		>
			<img
				src={profilePic}
				alt="Profile"
				class="border-secondary-400 bg-surface/80 h-14 w-14 rounded-full border-2 object-cover shadow-md backdrop-blur-md transition-transform duration-200 hover:scale-105"
			/>
		</a>
	</div>
</header>

<div class="flex flex-wrap justify-center gap-6">
	{#if isLoading}
		<span class="text-secondary-400 mt-8 text-lg">Loading...</span>
	{:else if cards.length === 0}
		<span class="text-secondary-400 mt-8 text-lg">No results found.</span>
	{:else}
		{#each cards as card}
			<PreviewCard id={card.id} previewImage={card.previewImage} name={card.name} />
		{/each}
	{/if}
</div>
