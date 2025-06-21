<script>
	import LogoBtn from './LogoBtn.svelte';
	import { onDestroy, onMount } from 'svelte';
	import FeaturedBackgroundSlides from '$lib/FeaturedBackgroundSlides.svelte';

	let { data } = $props();

	let bottomText = $state('');
	let avalableTexts = [
		'Stream Tousands of Vintage Movies Today.',
		'Relive the Golden Age — One Film at a Time.',
		'Stream Timeless Classics, Anytime.',
		'Where Vintage Cinema Comes Back to Life.',
		'Feel the Magic of a Bygone Era.',
		'Rediscover the Movies That Made History.',
		'The Past, Perfectly Preserved.',
		'Old Hollywood, New Convenience.',
		'Where Every Film Is a Classic.',
		'Stream the Stories That Shaped Cinema.',
		'Elegance. Drama. History. All in One Place.',
		'Timeless Tales, Ready to Stream.',
		'Old Films, New Life.',
		'Becking, bitte gib 1'
	];
	let currentWord = 0;
	let lastWord = 0;
	let timeoutId;

	function typeNewWord() {
		let timeToRemove = 0;
		for (let i = 0; i < bottomText.length; i++) {
			setTimeout(removeLetter, 50 * i + 1);
			timeToRemove += 50;
		}

		lastWord = currentWord;
		while (currentWord === lastWord) {
			currentWord = Math.floor(Math.random() * avalableTexts.length);
		}

		for (let i = 0; i < avalableTexts[currentWord].length; i++) {
			setTimeout(typeLetter, 100 * i + timeToRemove + 1000);
		}
		timeoutId = setTimeout(
			typeNewWord,
			7000 + timeToRemove + avalableTexts[currentWord].length * 100
		);
	}

	function removeLetter() {
		bottomText = bottomText.substring(0, bottomText.length - 1);
	}

	function typeLetter() {
		bottomText = avalableTexts[currentWord].substring(0, bottomText.length + 1);
	}

	onMount(() => {
		typeNewWord();
	});

	onDestroy(() => {
		clearTimeout(timeoutId);
	});
</script>

<nav
	class="bg-surface/80 border-surface-800 bg-surface-900 sticky top-0 z-10 flex h-20 w-full items-center justify-between rounded border-b px-2 backdrop-blur-md"
>
	<!-- Left -->
	<div class="justify-start">
		<LogoBtn href="/" />
	</div>

	<!-- Mid -->
	<div></div>

	<!-- Right -->
	<div class="justify-end">
		<div class="flex gap-1">
			<a
				href="/login"
				class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 rounded-xl shadow-md hover:scale-105 focus:ring-2"
				>Login</a
			>
			<a
				href="/register"
				class="btn btn-lg btn-block text-secondary-400 focus:bg-primary-500 hover:ring-secondary-300 rounded-xl bg-transparent shadow-md hover:scale-105 hover:ring-2"
				>Register</a
			>
		</div>
	</div>
</nav>
<FeaturedBackgroundSlides movies={data.movies.movies} />
<div class="-mt-20 grid h-screen w-full place-items-center px-20">
	<div class="flex flex-col items-center">
		<img src="/wordmark_secondary.png" alt="Vintagflix Logo" class="w-2/3" />
		<div class="text-secondary-500 mt-10 text-center">
			<span class="text-4xl">{bottomText}</span>
			<span class="animate-pulse text-4xl">|</span>
		</div>
	</div>
</div>
