<script>
	import FeaturedBackgroundSlides from '$lib/FeaturedBackgroundSlides.svelte';

	let { children, data } = $props();
</script>

<FeaturedBackgroundSlides movies={data.movies.movies} />
{@render children()}
