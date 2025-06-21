<script>
	import LogoBtn from '../LogoBtn.svelte';
	import { goto } from '$app/navigation';
	let { profilePic } = $props();
</script>

<div
	class=" bg-surface-900 border-surface-800 fixed top-0 z-40 flex h-20 w-full items-center justify-between rounded border shadow"
>
	<LogoBtn href="/" />
	<div class=" items-center">
		<div class="flex h-20 items-center">
			<button
				href="/profile"
				class="focus:ring-primary mr-6 rounded-full focus:ring-2 focus:outline-none"
				aria-label="Go to profile"
			>
				<img
					src={profilePic}
					alt="Profile"
					class="border-secondary-400 bg-surface/80 h-14 w-14 rounded-full border-2 object-cover shadow-md backdrop-blur-md transition-transform duration-200 hover:scale-105"
				/>
			</button>
		</div>
	</div>
</div>
