<script>
	import PreviewCard from './PreviewCard.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import { ArrowDownWideNarrow, ArrowUpNarrowWide, Check, ChevronDown, X } from '@lucide/svelte';

	let { data } = $props();

    let movies = $derived(data.movies.movies);
    let search = $derived(data.searchString || '');
    let lastSearch;

    let lastId = data.movies.last_id;
    let hasMore = $state(data.movies.has_more);

	const genres = $state(data.genres.sort((a, b) => a.name.localeCompare(b.name)) || []);
    let genreFilter = $state([]);
    let genreFilterCollapse = $state(true);
    let genreFilterContainer = $state();
    let genreFilterContainerButton = $state();

    let filter = $state('release');
    let filterCollapse = $state(true);
    let filterContainer = $state();
    const filterOptions = [
        { label: 'Veröffentlichung', value: 'release' },
        { label: 'Alphabetisch', value: 'alphabetical' }
    ];
    let filterContainerButton = $state();

    let sortDirection = $state('desc'); // 'asc' or 'desc'

    let isLoading = $state(false);

    let firstLoad = true;

    let lastFetchTime = Date.now();
    let fetchTimeout;
    const fetchDelay = 500;

	async function getMovies() {
		if (!hasMore || isLoading) return;
		isLoading = true;
		const urlParams = new URLSearchParams({
			last_id: lastId,
			search: search,
			order_by: filter,
			order: sortDirection,
			genres: genreFilter ? genreFilter.map((g) => g.id).join(',') : ''
		});
		const response = await fetch(`/api/v1/movies?${urlParams.toString()}`);

		if (!response.ok) {
			return;
		}
		const data = await response.json();
		movies.push(...data.movies);
		lastId = data.last_id;
		hasMore = data.has_more;
		isLoading = false;
	}

	async function sortButton() {
		if (sortDirection === 'asc') {
			sortDirection = 'desc';
		} else {
			sortDirection = 'asc';
		}

        if (fetchTimeout) {
            clearTimeout(fetchTimeout);
        }

		fetchTimeout = setTimeout(async () => {
            lastId = '';
            hasMore = true;
            movies = [];
            await getMovies();
        }, lastFetchTime + fetchDelay - Date.now());
        lastFetchTime = Date.now();
	}

	async function switchFilter(value) {
		if (filter === value) return;
		filter = value;

        if (fetchTimeout) {
            clearTimeout(fetchTimeout);
        }

		fetchTimeout = setTimeout(async () => {
            lastId = '';
            hasMore = true;
            movies = [];
            await getMovies();
        }, lastFetchTime + fetchDelay - Date.now());
        lastFetchTime = Date.now();
	}

	async function loadMore() {
		await getMovies();
	}

	async function genreFilterChange(genre) {
		if (genreFilter.includes(genre)) {
			genreFilter = genreFilter.filter((g) => g.id !== genre.id);
		} else {
			genreFilter.push(genre);
		}

        if (fetchTimeout) {
            clearTimeout(fetchTimeout);
        }

		fetchTimeout = setTimeout(async () => {
            lastId = '';
            hasMore = true;
            movies = [];
            await getMovies();
        }, lastFetchTime + fetchDelay - Date.now());
        lastFetchTime = Date.now();
	}
</script>

<div class="mb-4 flex items-center justify-between px-4">
	<div
		onfocusoutcapture={(f) =>
			genreFilterContainer?.contains(f.relatedTarget) || genreFilterContainerButton?.contains(f.relatedTarget) ? true : (genreFilterCollapse = true)}
		class="text-secondary-500 relative flex"
	>
		<button
            bind:this={genreFilterContainerButton}
			onclick={() => (genreFilterCollapse = !genreFilterCollapse)}
			class="bg-surface-900 text-secondary-500 flex h-10 items-center rounded-lg p-2"
		>
			<ChevronDown class="h-6 w-6 transition-all {genreFilterCollapse ? 'rotate-180' : ''}" />
			<p>Genres</p>
		</button>
		{#if !genreFilterCollapse}
			<div
				bind:this={genreFilterContainer}
				class="bg-surface-900 absolute top-full left-0 z-40 mt-2 max-h-60 overflow-y-auto scroll rounded-lg shadow-lg"
			>
				{#each genres as genre}
					<button
						onclick={() => genreFilterChange(genre)}
						class="hover:bg-surface-700 flex w-40 items-center gap-1 p-2 text-left"
					>
						<div class="border-primary-500 relative h-4 w-4 rounded border-2">
							{#if genreFilter.includes(genre)}
								<Check class="absolute -top-0.5 -left-0.5 h-4 w-4" />
							{/if}
						</div>
						<p class="truncate">{genre.name}</p>
					</button>
				{/each}
			</div>
		{/if}
	</div>
	<div class="flex h-10 items-center justify-end gap-1">
		<div
			onfocusoutcapture={(f) =>
				filterContainer?.contains(f.relatedTarget) || filterContainerButton?.contains(f.relatedTarget) ? true : (filterCollapse = true)}
			class="text-secondary-500 relative flex w-40 justify-end"
		>
			<button
                bind:this={filterContainerButton}
				onclick={() => (filterCollapse = !filterCollapse)}
				class="bg-surface-900 text-secondary-500 flex h-10 items-center rounded-lg p-2"
			>
				<p>{filterOptions.filter((e) => e.value === filter)[0].label}</p>
				<ChevronDown class="h-6 w-6 transition-all {filterCollapse ? '-rotate-180' : ''}" />
			</button>
			{#if !filterCollapse}
				<div
					bind:this={filterContainer}
					class="bg-surface-900 absolute top-full right-0 z-40 mt-2 overflow-hidden rounded-lg shadow-lg"
				>
					{#each filterOptions as option}
						<button
							onclick={() => switchFilter(option.value)}
							class="hover:bg-surface-700 flex w-full items-center justify-end gap-1 p-2 text-right {option.value !==
							filter
								? 'pr-9'
								: ''}"
						>
							<p>{option.label}</p>
							{#if option.value === filter}
								<Check />
							{/if}
						</button>
					{/each}
				</div>
			{/if}
		</div>
		<button onclick={sortButton} class="bg-surface-900 text-secondary-500 rounded-lg p-2">
			{#if sortDirection === 'asc'}
				<ArrowDownWideNarrow />
			{:else}
				<ArrowUpNarrowWide />
			{/if}
		</button>
	</div>
</div>
{#if genreFilter.length > 0}
	<div class="mb-4 flex w-full flex-wrap gap-2 px-4">
		{#each genreFilter as genre (genre.id)}
			<button
				onclick={() => genreFilterChange(genre)}
				class="bg-surface-900 text-secondary-500 flex items-center justify-between gap-1 rounded-lg px-2 py-1"
			>
				<span>{genre.name}</span>
				<X class="h-4 w-4" />
			</button>
		{/each}
	</div>
{/if}
<div class="flex flex-wrap justify-center gap-6 px-4">
	{#if movies.length === 0 && !isLoading}
		<span class="text-secondary-400 mt-8 text-lg">Keine Filme gefunden.</span>
	{:else}
		{#each movies as card (card.id)}
			<PreviewCard id={card.id} previewImage={card.cover} name={card.title} />
		{/each}
	{/if}
</div>
<div class="mt-8 flex justify-center">
	{#if isLoading}
		<ProgressRing
			value={null}
			size="size-10"
			meterStroke="stroke-secondary-600-400"
			trackStroke="stroke-primary-50-950"
			class="mt-8"
		/>
	{:else if hasMore}
		<button
			onclick={loadMore}
			class="btn bg-primary-500 text-secondary-500 rounded-lg px-4 py-2 hover:scale-105"
			aria-label="Mehr Filme laden"
		>
			Mehr Filme laden
		</button>
	{/if}
</div>
