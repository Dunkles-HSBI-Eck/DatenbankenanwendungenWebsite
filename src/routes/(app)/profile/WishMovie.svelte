<script>
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	let wish = $state('');
	let showLoading = $state(false);
	let submitted = $state(false);

	async function submitWish() {
		if (wish == '') {
			return;
		}
		showLoading = true;
		//hier API call
		showLoading = false;
		submitted = true;
		wish='';
	}
</script>

<h1 class="text-secondary-400 mb-8 text-center">Request a Movie</h1>
<p class="text-secondary-400 mb-1">You did not find what you searched for? Let us know.</p>

<div class="flex flex-col items-center space-y-6">
	<label class="w-full">
		<textarea
			bind:value={wish}
			class="textarea text-secondary-400 border-surface-600 focus:border-primary-500 bg-surface-800 w-full rounded-md border p-2 focus:outline-none"
			rows="4"
			placeholder="..."
		></textarea>
	</label>
	<div class="w-full">
		{#if submitted}
			<p class="text-secondary-400">your request has been submitted.</p>
		{/if}

		{#if !showLoading}
			<button
				class="btn btn-lg text-secondary-400 bg-primary-500 focus:ring-secondary-300 h-10 max-w-xs rounded-xl shadow-md focus:ring-2"
				onclick={() => submitWish()}
			>
				<p>Submit</p>
			</button>
		{:else}
			<div class="btn btn-lg text-secondary-400 bg-primary-900 h-10 max-w-xs rounded-xl shadow-md">
				<p>Submit</p>
				<ProgressRing
					value={null}
					size="size-5"
					meterStroke="stroke-secondary-600-400"
					trackStroke="stroke-primary-50-950"
				/>
			</div>
		{/if}
	</div>
</div>
