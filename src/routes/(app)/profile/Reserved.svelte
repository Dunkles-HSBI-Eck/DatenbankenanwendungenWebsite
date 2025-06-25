<script>
	export let tableData = [];

	async function rentMovie(movieId) {
		const rentRespond = await fetch('/api/v1/movies/rent', {
			method: 'POST',
			body: JSON.stringify({
				movieId: movieId
			})
		});
		if(rentRespond.ok)
		{
			location.reload();
		}
	}
</script>

<div class="card w-full rounded-2xl">
	<div class="text-secondary-400 mb-2 text-center text-sm font-medium opacity-70">
		Reserved Movies:
	</div>
	<div class="text-secondary-400 mb-2 text-center text-sm font-medium opacity-70">
		{tableData.length}
	</div>
	<div class="flex flex-col items-center gap-4">
		{#each tableData as row}
			<div class="card bg-surface-900 w-full max-w-md rounded-3xl p-4">
				<div class="flex flex-row items-center justify-between">
					<div class="text-secondary-400 mb-2 text-lg font-bold">{row.titel}</div>
					<div class="text-secondary-400 ml-4">
                        {#if row.status}
                            <button class="btn bg-primary-500" type="button" on:click={() => rentMovie(row.id)}>
                                Rent movie
                            </button>
                        {:else}
                            <span>Not yet availible</span>
                        {/if}
                    </div>
				</div>
			</div>
		{/each}
	</div>
</div>
