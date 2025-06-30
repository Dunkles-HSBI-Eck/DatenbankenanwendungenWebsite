<script>
	export let plan;
	export let selected = false;
	import { ArrowLeft } from '@lucide/svelte';

	async function changePlan() {

		const returnRespond = await fetch('/api/v1/user/tier', {
			method: 'POST',
			body: JSON.stringify({
				tierId: plan.id
			})
		});

		location.reload();
		
	}
</script>

<div class="relative mt-8 flex w-full flex-col items-center gap-6">
	<div
		class="bg-surface-900 border-surface-800 hover:shadow-primary-500/30 hover:border-primary flex h-[80vh] w-full max-w-md cursor-pointer flex-col rounded-2xl border p-10 shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-103"
	>
		<div class="flex h-full w-full flex-1 flex-col items-center justify-between">
			<div class="flex flex-col items-center gap-2">
				<h2 class="text-secondary-400 text-center text-3xl font-extrabold drop-shadow">
					{plan.name}
				</h2>
				<p class="text-secondary-400 text-2xl font-semibold">
					{plan.price === 0 ? 'Free' : plan.price + ' €'}
				</p>
				<p class="text-primary-400 text-center">Cost reduction: {plan.priceReduction}%</p>
			</div>
			<div class="mt-4 flex w-full flex-col items-center">
				{#if selected}
					<p class="text-success-400 text-lg font-bold">Current Plan</p>
				{:else}
					<button
						on:click={changePlan}
						class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 rounded-xl shadow-md focus:ring-2"
						>Change Plan</button
					>
				{/if}
			</div>
		</div>
	</div>
</div>
