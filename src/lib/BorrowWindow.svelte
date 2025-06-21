<script>
  import { X as XIcon } from '@lucide/svelte';


  let {movieTitle, cancelFunction} = $props();

</script>

<div class="fixed z-50 flex justify-center items-center w-full h-full">
  <div class="w-1/2 h-1/2 bg-surface-800 rounded border border-surface-700 shadow-2xl flex flex-col">
    <!-- Top bar -->
    <div class="w-full h-10 bg-surface-900 flex items-center justify-between">
      <h1 class="text-white p-4">rent Movie: {movieTitle}</h1>
      <button onclick={cancelFunction} class="w-fit h-full hover:bg-primary-500 flex items-center rounded">
        <XIcon class="w-6 h-5 m-6 text-white cursor-pointer" />
      </button>
    </div>

    <!-- Content -->
    <div class="flex-grow p-4">
      <p>this is very cool text</p>
    </div>

    <!-- Bottom buttons -->
    <div class="w-full flex justify-between px-10 py-4 border-t border-surface-700">
      <button onclick={cancelFunction} class="flex bg-surface-700 text-white px-4 py-2 rounded hover:bg-surface-600">Cancel</button>
      <button class="flex bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600">Confirm</button>
    </div>
  </div>
</div>