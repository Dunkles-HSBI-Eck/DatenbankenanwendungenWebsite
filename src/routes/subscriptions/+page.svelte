<script>
	import { onMount } from 'svelte';
	import PlanPreview from './PlanPreview.svelte';

	let subscriptions = [];

	let currentPlanID = 5;

	onMount(async () => {
		const response = await fetch(`/api/v1/tiers`);
		const data = await response.json();
		
		const response2 = await fetch(`/api/v1/tier`);
		const data2 = await response2.json();

		// Set currentPlanID from API
		if (data2.tiers && data2.tiers.length > 0) {
			currentPlanID = data2.tiers[0].current_tier;
		}

		// Map API data to your subscriptions structure
		subscriptions = data.tiers.map(tier => ({
			id: tier.id,
			name: tier.name,
			price: tier.price,
			priceReduction: tier.discount
		}));
	});
</script>

<div class="m-5 flex items-center justify-center gap-4 overflow-x-visible py-4">
	
	{#each subscriptions as plan}
		<PlanPreview {plan} selected={plan.id === currentPlanID} />
	{/each}
</div>
