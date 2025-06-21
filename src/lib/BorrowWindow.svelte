<script>
	import { X as XIcon } from '@lucide/svelte';

	let { movieTitle, cancelFunction, price } = $props();
</script>

<div class="fixed z-50 flex h-full w-full items-center justify-center text-secondary-500">
	<div
		class="bg-surface-800 border-surface-700 flex h-1/2 w-1/2 flex-col rounded border shadow-2xl"
	>
		<!-- Top bar -->
		<div class="bg-surface-900 flex h-10 w-full items-center justify-between">
			<h1 class="p-4">rent Movie: {movieTitle}</h1>
			<button
				onclick={cancelFunction}
				class="hover:bg-primary-500 flex h-full w-fit items-center rounded"
			>
				<XIcon class="m-6 h-5 w-6 cursor-pointer text-secondary-500" />
			</button>
		</div>

		<!-- Content -->
		<div class="flex-grow p-4">
			<p>You are about to rent the following movie for 14 days for a price of {price || 0}€:</p> <br>
      <p>{movieTitle}</p>
      
		</div>

		<!-- Bottom buttons -->
		<div class="border-surface-700 flex w-full justify-between border-t px-10 py-4">
			<button
				onclick={cancelFunction}
				class="bg-surface-700 hover:bg-surface-600 flex rounded px-4 py-2 ">Cancel</button
			>
			<button class="bg-primary-500 hover:bg-primary-600 flex rounded px-4 py-2 "
				>Confirm</button
			>
		</div>
	</div>
</div>
