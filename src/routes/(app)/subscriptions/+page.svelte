<script>
	import { onMount } from 'svelte';
	import PlanPreview from './PlanPreview.svelte';

	let { data } = $props();

	let subscriptions = data.subscriptions;

	let currentPlanID = data.currentPlanID;

</script>

<div class="m-5 flex items-center justify-center gap-4 overflow-x-visible py-4">
	{#each subscriptions as plan}
		<PlanPreview {plan} selected={plan.id === currentPlanID} />
	{/each}
</div>
