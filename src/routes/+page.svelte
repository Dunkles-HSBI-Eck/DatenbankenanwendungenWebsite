<script>
	import LogoBtn from './LogoBtn.svelte';
</script>

<nav class="sticky top-0 z-10 flex items-center justify-between mb-8 px-2 w-full bg-surface/80 backdrop-blur-md border-b border-secondary-400">
	<!-- Left -->
	<div class="justify-start">
		<LogoBtn/>
	</div>

	<!-- Mid -->
	<div>

	</div>

	<!-- Right -->
	<div class="justify-end">
		<div class="flex gap-1">
			<a href="/login" class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 focus:ring-2 rounded-xl shadow-md hover:scale-105">Login</a>
			<a href="/register" class="btn btn-lg btn-block text-secondary-400 bg-transparent focus:bg-primary-500 hover:ring-secondary-300 hover:ring-2 hover:scale-105 rounded-xl shadow-md">Register</a>
		</div>
	</div>
</nav>

<img src="LogoCropped.png" alt="Logo"/>
