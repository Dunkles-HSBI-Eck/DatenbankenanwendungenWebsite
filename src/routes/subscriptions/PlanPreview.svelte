<script>
    export let plan;
    export let selected = false;
    import { ArrowLeft } from '@lucide/svelte';
</script>

<div class="flex flex-col items-center gap-6 mt-8 relative w-full">
  <button onclick={() => history.back()} aria-label="Go back" class="absolute top-6 left-6 flex items-center gap-2 text-secondary-400 bg-transparent border-none p-0">
    <ArrowLeft class="h-6 w-6 hover:bg-surface-800 rounded p-1" />
  </button>
<div class="bg-surface-900 border-surface-800 flex w-full max-w-md flex-col h-[80vh] p-10 shadow-2xl backdrop-blur-md rounded-2xl border transition-all duration-200 hover:scale-103 hover:shadow-primary-500/30 hover:border-primary cursor-pointer">
  <div class="flex flex-col flex-1 w-full items-center justify-between h-full">
    <div class="flex flex-col items-center gap-2">
      <h2 class="text-secondary-400 text-center text-3xl font-extrabold drop-shadow">{plan.name}</h2>
      <p class="text-2xl font-semibold text-secondary-400">{plan.price === 0 ? 'Free' : plan.price + ' €'}</p>
      <p class="text-primary-400 text-center">Cost reduction: {plan.priceReduction * 100}%</p>
    </div>
    <div class="w-full flex flex-col items-center mt-4">
      {#if selected}
        <p class="text-success-400 font-bold text-lg">Current Plan</p>
      {:else}
        <button class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 rounded-xl shadow-md focus:ring-2">Change Plan</button>
      {/if}
    </div>
  </div>
</div>
</div>
