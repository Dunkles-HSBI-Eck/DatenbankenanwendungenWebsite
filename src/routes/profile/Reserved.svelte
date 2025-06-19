<script>
  export let tableData = [];
</script>

<div class="card rounded-2xl w-full">
  <div class="text-sm font-medium mb-2 text-secondary-400 text-center opacity-70">
    Vorgemerkte Filme:
  </div>
  <div class="text-sm font-medium mb-2 text-secondary-400 text-center opacity-70">
    {tableData.length}
  </div>
  <div class="flex flex-col gap-4 items-center">
    {#each tableData as row}
      <div class="card w-full max-w-md bg-surface-900 p-4 rounded-3xl">
        <div class="flex flex-row items-center justify-between">
          <div class="font-bold text-lg text-secondary-400 mb-2">{row.titel}</div>
          <div class="text-secondary-400 ml-4">
            {#if row.availible}
              <button class="btn bg-primary-500" type="button">
                Ausleihen
              </button>
            {:else}
              <span>Not jet availible</span>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
