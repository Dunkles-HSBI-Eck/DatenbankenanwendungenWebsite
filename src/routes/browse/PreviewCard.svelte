<script>
	import { goto } from "$app/navigation";

  export let previewImage;
  export let name;
  export let id;
  export let onClick;

  // Default onClick navigates to the correct URL with the actual id
  if (!onClick) {
    onClick = () => goto(`/preview/${id}`);
  }
</script>

<button type="button"
  class="w-[220px] rounded-xl overflow-hidden shadow-lg bg-neutral-900 transition-transform duration-200 cursor-pointer m-0 hover:scale-110 hover:shadow-2xl text-left"
  on:click={onClick}
  aria-label={name}>
  <div class="relative w-full h-[124px] bg-neutral-800 flex items-center justify-center">
    <img src="/api/v1/covers/{previewImage}" alt={name} class="w-full h-[124px] object-cover block" />
    <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-neutral-900/95 via-neutral-900/60 to-transparent px-4 pb-2 pt-6 flex items-end min-h-[40px]">
      <span class="text-secondary-400 text-base font-semibold drop-shadow-md truncate w-full">{name}</span>
    </div>
  </div>
</button>