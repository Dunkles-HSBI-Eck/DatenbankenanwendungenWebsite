<script>
    import PreviewCard from "./PreviewCard.svelte";
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let search = "";
    let filter = "all";
    let profilePic = "/Logo.png";
    let isLoading = false;

    let lastid = 0;
    let page_size = 20;

    let cards = [];

    let filterOptions = [
        { value: "all", label: "All" },
        { value: "test", label: "Test" },
        { value: "second", label: "Second" },
        { value: "final", label: "Final" }
    ];

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
            const newCards = data.movies.map(movie => ({
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

    onMount(() => {
        fetchData();
    });
</script>

<header class="sticky top-0 z-10 flex items-center justify-between mb-8 px-2 w-full bg-surface/80 backdrop-blur-md border-b border-secondary-400">
    <div class="flex items-center gap-3 w-full max-w-lg justify-center mx-auto">
        <input
            type="text"
            placeholder="Search..."
            bind:value={search}
            on:input={getNewMovies}
            class="w-full bg-surface text-secondary-400 placeholder:text-secondary-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary border border-secondary shadow-sm transition-all duration-200"
        />
        <select bind:value={filter} on:change={getNewMovies} class="w-40 bg-surface-800 text-secondary-400 rounded-lg px-3 py-2 border border-secondary focus:outline-none focus:ring-2 focus:ring-primary shadow-sm appearance-none">
            {#each filterOptions as option}
                <option value={option.value} class="text-secondary-400">{option.label}</option>
            {/each}
        </select>
    </div>
    <div class="flex items-center h-20">
        <a href="/profile" class="mr-6 rounded-full focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Go to profile">
            <img src={profilePic} alt="Profile" class="w-14 h-14 rounded-full border-2 border-secondary-400 object-cover shadow-md hover:scale-105 transition-transform duration-200 bg-surface/80 backdrop-blur-md" />
        </a>
    </div>
</header>

<div class="flex flex-wrap gap-6 justify-center">
    {#if isLoading}
        <span class="text-secondary-400 text-lg mt-8">Loading...</span>
    {:else if cards.length === 0}
        <span class="text-secondary-400 text-lg mt-8">No results found.</span>
    {:else}
        {#each cards as card}
            <PreviewCard id={card.id} previewImage={card.previewImage} name={card.name} />
        {/each}
    {/if}
</div>