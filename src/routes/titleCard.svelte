<script>
	let { titel, thumbnail, href } = $props();
</script>

<a {href}>
	<div class="preset-filled-primary-500 m-10 h-100 w-100 duration-100 hover:scale-120">
		<header>
			<div class="max-w flex h-60 w-100 overflow-hidden">
				<img src={thumbnail} alt="thumbnail" class="h-full w-full object-contain object-center" />
			</div>
		</header>

		<h1 class="base-font-color-dark base-font-style base-font-family text-2xl">{titel}</h1>
	</div>
</a>
