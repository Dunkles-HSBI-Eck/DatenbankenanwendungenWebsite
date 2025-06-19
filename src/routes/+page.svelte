<script>
	import LogoBtn from './LogoBtn.svelte';
	import { onDestroy, onMount } from 'svelte';

	let bottomText = $state("");
	let avalableTexts = ["Stream Tousands of Vintage Movies Today.", "Relive the Golden Age — One Film at a Time.", "Stream Timeless Classics, Anytime.", "Where Vintage Cinema Comes Back to Life.", "Feel the Magic of a Bygone Era.", "Rediscover the Movies That Made History.", "The Past, Perfectly Preserved.", "Old Hollywood, New Convenience.", "Where Every Film Is a Classic.","Stream the Stories That Shaped Cinema.", "Elegance. Drama. History. All in One Place.", "Timeless Tales, Ready to Stream.", "Old Films, New Life.", "Becking, bitte gib 1"];
	let currentWord = 0;
	let timeoutId;

	function typeNewWord()
	{
		let timeToRemove = 0;
		for(let i = 0; i < bottomText.length; i++)
		{
			setTimeout(removeLetter, 50 * i +1);
			timeToRemove += 50;
		}

		currentWord = Math.floor(Math.random() * avalableTexts.length);
		console.log(avalableTexts[currentWord]);
		for(let i  = 0; i < avalableTexts[currentWord].length; i++)
		{
			setTimeout(typeLetter, 100 * i +timeToRemove + 1000);
		}
		timeoutId = setTimeout(typeNewWord, 7000 + timeToRemove + (avalableTexts[currentWord].length * 100));
	}

	function removeLetter()
	{
		bottomText = bottomText.substring(0, bottomText.length-1);
	}
	
	function typeLetter()
	{
		bottomText = avalableTexts[currentWord].substring(0, bottomText.length +1);
	}

	onMount(() => {

		typeNewWord();
	});
	
	onDestroy(() => {
		clearTimeout(timeoutId);
	});
	

</script>

<nav class="sticky top-0 z-10 flex items-center justify-between mb-8 px-2 w-full bg-surface/80 backdrop-blur-md border-b border-surface-800 bg-surface-900 rounded">
	<!-- Left -->
	<div class="justify-start">
		<LogoBtn href="/"/>
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
<div class="justify-center flex pt-10">


	<div class = "bg-secondary-500  flex border-surface-900 border-2 w-fit h-fit rounded-full justify-center " >
		<img src="Logo.png" alt="Logo" class="flex w-3/5 ">
	</div>
</div>
<div class="justify-center flex">


	<div class = " flex pt-10 w-fit gap-4 h-30">
		<a href="/login" class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 focus:ring-2 rounded-xl shadow-md hover:scale-105 text-3xl">Login</a>
		<a href="/register" class="btn btn-lg btn-block text-secondary-400 focus:bg-primary-500 hover:ring-secondary-300 hover:ring-2 hover:scale-105 rounded-xl shadow-md bg-surface-900 text-3xl">Register</a>
	</div>
</div>

<div class = "flex justify-center pt-30 text-secondary-500">
	<div class = "flex  text-wrap">	

		<span class="text-6xl ">{bottomText}</span><span class="text-6xl animate-pulse">|</span>
	</div>
</div>

