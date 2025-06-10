<script>
    import PreviewCard from "./PreviewCard.svelte";
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    export let data;

    let search = "";
    let filter = "all";
    let profilePic = "/Logo.png";
    let isLoading = false;

    // Example list of cards
    let cards = [
        { id: 1, previewImage: "/Logo.png", name: "Test Card" },
        { id: 2, previewImage: "/Logo.png", name: "Second Card" },
        { id: 3, previewImage: "/Logo.png", name: "Alpha Card" },
        { id: 4, previewImage: "/Logo.png", name: "Beta Card" },
        { id: 5, previewImage: "/Logo.png", name: "Gamma Card" },
        { id: 6, previewImage: "/Logo.png", name: "Delta Card" },
        { id: 7, previewImage: "/Logo.png", name: "Epsilon Card" },
        { id: 8, previewImage: "/Logo.png", name: "Zeta Card" },
        { id: 9, previewImage: "/Logo.png", name: "Eta Card" },
        { id: 10, previewImage: "/Logo.png", name: "Theta Card" },
        { id: 11, previewImage: "/Logo.png", name: "Iota Card" },
        { id: 12, previewImage: "/Logo.png", name: "Kappa Card" },
        { id: 13, previewImage: "/Logo.png", name: "Lambda Card" },
        { id: 14, previewImage: "/Logo.png", name: "Final Card" }
    ];
    // List of filter options (example: genres, categories, etc.)
    let filterOptions = [
        { value: "all", label: "All" },
        { value: "test", label: "Test" },
        { value: "second", label: "Second" },
        { value: "final", label: "Final" }
    ];

    function handleProfileClick() {
        if (data.userId) {
            goto('/profile');
        } else {
            goto('/login');
        }
    }

    async function fetchData() {
    }
</script>

<header class="sticky top-0 z-10 flex items-center justify-between mb-8 px-2 w-full bg-surface/80 backdrop-blur-md border-b border-secondary-400">
    <div class="flex items-center gap-3 w-full max-w-lg justify-center mx-auto">
        <input
            type="text"
            placeholder="Search..."
            bind:value={search}
            on:input={fetchData}
            class="w-full bg-surface text-secondary-400 placeholder:text-secondary-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary border border-secondary shadow-sm transition-all duration-200"
        />
        <select bind:value={filter} on:change={fetchData} class="w-40 bg-surface-800 text-secondary-400 rounded-lg px-3 py-2 border border-secondary focus:outline-none focus:ring-2 focus:ring-primary shadow-sm appearance-none">
            {#each filterOptions as option}
                <option value={option.value} class="text-secondary-400">{option.label}</option>
            {/each}
        </select>
    </div>
    <div class="flex items-center h-20">
        <img src={profilePic} alt="Profile" class="w-14 h-14 rounded-full border-2 border-secondary-400 object-cover shadow-md hover:scale-105 transition-transform duration-200 bg-surface/80 backdrop-blur-md mr-6" on:click={handleProfileClick} style="cursor:pointer;" />
    </div>
</header>

<!-- Cards grid -->
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