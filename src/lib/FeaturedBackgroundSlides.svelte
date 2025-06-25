<script>
	import { X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { bounceOut, cubicOut, sineOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { fly } from 'svelte/transition';

	let { movies } = $props();

	let featuredContainer = $state();
	let featuredContainerHeight = $state(0);
	let featuredContainerWidth = $state(0);
	let tweens = $state([]);
	let speeds = $state([]);
	let movieArrays = $state([]);
	let cardWidth = $state(0);

	onMount(() => {
		if (!featuredContainer) return;

		let id = 0;
		const tempMovieArrays = Array.from({ length: Math.ceil(featuredContainerHeight / 200) }, () =>
			Array.from({ length: Math.ceil(featuredContainerWidth / 100) }, () => {
				const movie = movies[Math.floor(Math.random() * movies.length)];
				return { ...movie, elementId: id++ };
			})
		);

		for (const row of tempMovieArrays) {
			speeds.push({
				direction: Math.random() < 0.5 ? -1 : 1,
				duration: Math.random() * (30000 - 25000) + 25000
			});
			tweens.push(
				new Tween(0, {
					duration: speeds[speeds.length - 1].duration
				})
			);
		}
		setTimeout(startTween, 1000);
		movieArrays = tempMovieArrays;
	});

	function startTween() {
		for (let i = 0; i < tweens.length; i++) {
			tweens[i].set(speeds[i].direction * 1000);
		}
	}

	$effect(() => {
		for (let i = 0; i < tweens.length; i++) {
			if (tweens[i].current > cardWidth + 20) {
				movieArrays[i].unshift(movieArrays[i].pop());
				tweens[i].set(0, {
					duration: 0
				});
				tweens[i].set(speeds[i].direction * 1000);
			} else if (tweens[i].current < -cardWidth - 20) {
				movieArrays[i].push(movieArrays[i].shift());
				tweens[i].set(0, {
					duration: 0
				});
				tweens[i].set(speeds[i].direction * 1000);
			}
		}
	});

	$effect(() => {
		if (Math.ceil(featuredContainerHeight / 200) > movieArrays.length) {
			movieArrays.push(
				Array.from({ length: Math.ceil(featuredContainerWidth / 100) }, () => {
					const movie = movies[Math.floor(Math.random() * movies.length)];
					return { ...movie, elementId: id++ };
				})
			);
			for (let i = 0; i < movieArrays.length - speeds.length; i++) {
				speeds.push({
					speed: Math.random() < 0.5 ? -1 : 1,
					duration: Math.random() * (30000 - 25000) + 25000
				});
				tweens.push(
					new Tween(0, {
						duration: speeds[speeds.length - 1].duration
					})
				);
				tweens[tweens.length - 1].set(speeds[speeds.length - 1].speed * 1000);
			}
		}
		for (const row of movieArrays) {
			if (Math.ceil(featuredContainerWidth / 100) > row.length) {
				row.push(
					...Array.from({ length: Math.ceil(featuredContainerWidth / 100) - row.length }, () => {
						const movie = movies[Math.floor(Math.random() * movies.length)];
						return { ...movie, elementId: id++ };
					})
				);
			}
		}
	});

	function cubic(t, i) {
		const rise = Math.abs((speeds[i].direction * 1000) / speeds[i].duration);
		let value = (-1 + rise) * Math.pow(t, 2) + (2 - rise) * t;
		return value;
	}
</script>

<div
	bind:this={featuredContainer}
	bind:clientHeight={featuredContainerHeight}
	bind:clientWidth={featuredContainerWidth}
	class="fixed top-0 left-0 -z-50 -mt-32 grid h-full w-full rotate-6 gap-5 brightness-50"
>
	{#each movieArrays as movies, i}
		<div
			transition:fly={{
				x: featuredContainerWidth * -speeds[i].direction * 2,
				easing: (x) => cubic(x, i),
				duration: 1000
			}}
			style="transform: translateX({tweens[i].current || 0}px)"
			class="flex justify-center gap-5"
		>
			{#each movies as movie (movie.elementId)}
				<img
					bind:clientWidth={cardWidth}
					src="/api/v1/images/covers/{movie.cover}"
					alt={movie.title}
					class="h-60"
					loading="lazy"
				/>
			{/each}
		</div>
	{/each}
</div>
