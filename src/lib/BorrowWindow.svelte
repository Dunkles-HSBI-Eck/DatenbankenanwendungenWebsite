<script>
	import { X as XIcon } from '@lucide/svelte';
  import { bounceOut, cubicOut, sineOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
	let { movieTitle, cancelFunction, price } = $props();
</script>

<div class="fixed z-50 flex h-full w-full items-center justify-center text-secondary-500 pt-60">
  <div
		class="bg-surface-800 border-surface-700 flex h-full w-1/2 flex-col rounded border shadow-2xl" in:fly={{duration:500, easing:cubicOut, y:1000, opacity:100}}
	>
		<!-- Content -->
		<div class=" p-4">
			<p>You are about to rent the following movie for 14 days for a price of {price || 0}€: </p> <br>
      <div class="flex p-4 " > <p>{movieTitle}</p></div>

		</div>

		<!-- Bottom buttons -->
		<div class="border-surface-700 flex w-full justify-between border-t px-10 py-10 mt-10">
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
