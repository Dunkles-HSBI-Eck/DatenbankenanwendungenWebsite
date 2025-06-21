<script>
  export let tableData = [];
  export let maxLeihverträge;

</script>

<div class="card rounded-2xl w-full">
  <div class="text-sm font-medium mb-2 text-secondary-400 text-center opacity-70">
    Geliehene Filme:
  </div>
  <div class="text-sm font-medium mb-2 text-secondary-400 text-center opacity-70">
    {tableData.length}/{maxLeihverträge}
  </div>
  <div class="flex flex-col gap-4 items-center">
    {#each tableData as row}
      <div class="card w-full max-w-md bg-surface-900 p-4 rounded-3xl">
        <div class="font-bold text-lg text-secondary-400 mb-2">{row.titel}</div>
        <div class="flex flex-row gap-4 items-center justify-between">
          <div class="text-secondary-400"><strong>Ausgeliehen am:</strong> {row.startDate}</div>
          <div class="text-secondary-400"><strong>Noch Verügbar für:</strong> {row.timeLeft} <strong> Tage</strong></div>
          <div class="text-secondary-400">
            <button class="btn bg-primary-500" type="button">
              zurück geben
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
