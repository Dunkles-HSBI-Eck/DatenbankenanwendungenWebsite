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
