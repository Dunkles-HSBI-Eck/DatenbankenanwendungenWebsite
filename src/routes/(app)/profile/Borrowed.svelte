<script>
	export let tableData = [];
	export let maxLeihverträge;

	async function returnMovie(movieId) {
		const returnRespond = await fetch('/api/v1/movies/return', {
			method: 'POST',
			body: JSON.stringify({
				movieId: movieId
			})
		});
		if(returnRespond.ok)
		{
			location.reload();
		}
	}
</script>

<div class="card w-full rounded-2xl">
	<div class="text-secondary-400 mb-2 text-center text-sm font-medium opacity-70">
		Geliehene Filme:
	</div>
	<div class="text-secondary-400 mb-2 text-center text-sm font-medium opacity-70">
		{tableData.length}/{maxLeihverträge}
	</div>
	<div class="flex flex-col items-center gap-4">
		{#each tableData as row}
			<div class="card bg-surface-900 w-full max-w-md rounded-3xl p-4">
				<div class="text-secondary-400 mb-2 text-lg font-bold">{row.titel}</div>
				<div class="flex flex-row items-center justify-between gap-4">
					<div class="text-secondary-400"><strong>Ausgeliehen am:</strong> {row.startDate}</div>
					<div class="text-secondary-400">
						<strong>Noch Verügbar für:</strong>
						{row.timeLeft} <strong> Tage</strong>
					</div>
					<div class="text-secondary-400">
                        <button
                            class="btn bg-primary-500"
                            type="button"
                            on:click={() => returnMovie(row.id)}
                        >
                            zurück geben
                        </button>
                    </div>
				</div>
			</div>
		{/each}
	</div>
</div>
