<script>
	import '../../app.css';
    import { userId } from '$lib/store';
    import Navbar from '$lib/Navbar.svelte';

	let { children, data } = $props();

    userId.set(data.userId);
</script>

<div class="relative">
    <Navbar />
    <div class="mt-24">
        {@render children()}
    </div>
</div>
