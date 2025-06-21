<script>
	import { goto } from '$app/navigation';

	export let previewImage;
	export let name;
	export let id;
	export let onClick;

	// Default onClick navigates to the correct URL with the actual id
	if (!onClick) {
		onClick = () => goto(`/movie/${id}`);
	}
</script>

<button
	type="button"
	class="m-0 w-[220px] cursor-pointer overflow-hidden rounded-xl bg-neutral-900 text-left shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-2xl"
	on:click={onClick}
	aria-label={name}
>
	<div class="relative flex aspect-3/4 w-full items-center justify-center bg-neutral-800">
		<img src="/api/v1/images/covers/{previewImage}" alt={name} class="block w-full object-cover" />
		<div
			class="absolute bottom-0 left-0 flex min-h-[40px] w-full items-end bg-gradient-to-t from-neutral-900/95 via-neutral-900/60 to-transparent px-4 pt-6 pb-2"
		>
			<span class="text-secondary-400 w-full truncate text-base font-semibold drop-shadow-md"
				>{name}</span
			>
		</div>
	</div>
</button>
