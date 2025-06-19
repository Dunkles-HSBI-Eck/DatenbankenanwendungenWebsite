<script>
	import TagCard from './TagCard.svelte';
	import { TvMinimalPlay } from '@lucide/svelte';
	import { Undo2 as ReturnIcon } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import TopBar from './TopBar.svelte';
	
	let {data} = $props();
	let { movieId } = data;

	let title = $state('Die Feuerzangenbowle');
	let thumbnailSrc = $state('https://www.daserste.de/allgemein/sendungen/sendung/die-feuerzangenbowle-100~_v-facebook1200_2bbce2.jpg');
	let description = $state("Die Rahmenhandlung des Films beginnt mit einer Runde vier älterer Herren, die sich bei einer Feuerzangenbowle Geschichten aus ihrer Schulzeit erzählen. Der erfolgreiche junge Schriftsteller Dr. Johannes Pfeiffer stößt erst später zu der geselligen Runde. Der Spaß, den seine Freunde in ihrer Schulzeit hatten, ist ihm fremd. Er blieb Pfeiffer versagt, da er von einem Hauslehrer unterrichtet wurde. Seine Freunde animieren ihn daraufhin, das Versäumte nachzuholen und als Oberschüler verkleidet für ein paar Wochen eine richtige Schule zu besuchen. Die Wahl fällt auf ein Gymnasium in der kleinen Stadt Babenberg. ");
	let preis = $state("3,99€")
	let licencesAvalable = $state(20);
	let amountDays = $state(20);
	let year = $state(1944);
	let tags = $state(["Komödie", "Kirans Mutter"]);
	let length = $state(5640);
	let userOwnsMovie = $state(false);
	let cast = $state([{task:"Directed by", name:["Helmut Weiss"]}, {task:"Written by", name:["Heinrich Spoerl"]}, {task:"Starring", name:["Heinz Rühmann", "Erich Ponto"]}]);
	 
	let focusOnLoad;

	function formatTime(seconds) {
		seconds = Math.floor(seconds);
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;

		if (hours > 0) {
			return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
		}

		return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
	}


	onMount(() => {

		focusOnLoad.scrollIntoView();
		console.log(data);
		console.log(movieId);
	});

	
</script>
<TopBar profilePic="/Logo.png" data={data} />
<main>
	<div>
		<img src={thumbnailSrc} alt="thumbnail" class="w-full fixed -z-30" />
	</div>

	<div class = " z-40 w-250 flex pt-200 pl-10">
		<div class = "bg-surface-900 w-full items-baseline rounded p-10 border-surface-800 border shadow-2xl shadow-surface-950">	
			<h1 class="font-medium text-secondary-500 text-8xl m-1">{title}</h1>
			<br>
			<p class="font-medium text-2xl text-secondary-500">{year}</p>
			<br>
			<p class="font-medium text-2xl bottom-1 text-secondary-500">{description}</p>
			<div class="w-full flex">
				{#each tags as tag}
					<TagCard name={tag} class="flex"/>
				{/each}
				
			</div>
		</div>
	</div>
	<div class = "w-full  h-100 z-50 flex bg-surface-900 mt-10 p-10 rounded border border-surface-800">

		<div class = "h-full mr-10 text-secondary-500">
			<p class = "">licences avalable: {licencesAvalable}</p>
			<p>movie length: {formatTime(length)}</p>
			<br>
			{#each cast as category}
				<p> <strong>{category.task}</strong>:
					{#each category.name as castmember}
						{castmember} <br>
						
					{/each}
				</p>
				
			{/each}
		</div>
		{#if userOwnsMovie}

			<button bind:this={focusOnLoad}
				class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 h-27 rounded-xl shadow-md focus:ring-2"
			>
				<p class="flex">Watch now</p><TvMinimalPlay class="flex"/>
			</button>
			<button bind:this={focusOnLoad}
				class="btn btn-lg btn-block text-secondary-400 bg-surface-900 focus:ring-secondary-300 h-27 rounded-xl shadow-md focus:ring-2 ml-10 transition-colors duration-150 hover:underline"
			>
				<p class="flex">return movie</p><ReturnIcon class="flex"/>
			</button>
		{:else}
		{#if licencesAvalable > 0}
			<button bind:this={focusOnLoad}
				class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 h-27 rounded-xl shadow-md focus:ring-2"
			>
				<p>rent movie for {amountDays} days</p>
				<p> for {preis}</p>
			</button>
		{:else}
			<button bind:this={focusOnLoad}
				class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 h-27 rounded-xl shadow-md focus:ring-2"
			>
				<p>make a reservation</p>
			</button>
		{/if}
		{/if}
			
	</div>
	
</main>
