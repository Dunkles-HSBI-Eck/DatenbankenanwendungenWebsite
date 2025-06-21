<script>
	import { onDestroy, onMount } from 'svelte';

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

<div class="-mt-24 grid h-screen w-full place-items-center px-20">
	<div class="flex flex-col items-center">
		<img src="/wordmark_secondary.png" alt="Vintagflix Logo" class="w-2/3" />
		<div class="text-secondary-500 mt-10 text-center">
			<span class="text-4xl">{bottomText}</span>
			<span class="animate-pulse text-4xl">|</span>
		</div>
	</div>
</div>
