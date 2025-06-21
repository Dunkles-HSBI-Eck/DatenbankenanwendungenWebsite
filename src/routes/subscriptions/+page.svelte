<script>
	import PlanPreview from './PlanPreview.svelte';

	let subscriptions = [
		{ id: 1, name: 'Free', price: 0.0, priceReduction: 0.0 },
		{ id: 2, name: 'Pro', price: 10.0, priceReduction: 0.5 },
		{ id: 3, name: 'Ultra', price: 20.0, priceReduction: 8.0 },
		{ id: 4, name: 'Yeehaa', price: 200.0, priceReduction: 1.0 }
	];

	let currentPlanID = 1;
</script>

<div class="m-5 flex items-center justify-center gap-4 overflow-x-visible py-4">
	{#each subscriptions as plan}
		<PlanPreview {plan} selected={plan.id === currentPlanID} />
	{/each}
</div>
