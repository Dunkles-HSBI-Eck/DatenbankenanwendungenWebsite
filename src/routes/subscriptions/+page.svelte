<script>
    import PlanPreview from './PlanPreview.svelte';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    export let data;

    let subscriptions = [
        {id: 1, name: "Free", price: 0.0, priceReduction:0.0},
        {id: 2, name: "Pro", price: 10.0, priceReduction:0.5},
        {id: 3, name: "Ultra", price: 20.0, priceReduction:8.0},
        {id: 4, name: "Yeehaa", price: 200.0, priceReduction:1.0}
    ];

    let currentPlanID = 1;
    onMount(async () => {
        if (data.userId) {
            // user is logged in
            // to do set currentPlan
        } else {
            goto('/login');
        }
    });
</script>

<div class="flex gap-4 m-5 overflow-x-visible py-4 justify-center items-center">
    {#each subscriptions as plan}
        <PlanPreview plan={plan} selected={plan.id === currentPlanID} />
    {/each}
</div>