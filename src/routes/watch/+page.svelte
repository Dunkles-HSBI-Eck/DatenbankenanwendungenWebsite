<script>
	import { Slider } from '@skeletonlabs/skeleton-svelte';

	import { Play as IconPlay } from '@lucide/svelte';
	import { Pause as IconPause } from '@lucide/svelte';
	import { ArrowLeftFromLine as IconBack } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { VolumeOff, Volume1, Volume2 } from '@lucide/svelte';
	import { Maximize, Minimize } from '@lucide/svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import { fly, slide } from 'svelte/transition';

	import Hls from 'hls.js';

	let data = {
		video: {
			title: 'Test Stream',
			description: 'This is a test stream for demonstration purposes.',
			thumbnail: 'https://via.placeholder.com/150',
			src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
		}
	};

	let stream;
	let streamContainer;
	let currentTime = $state([0]);
	let currentTimeFormatted = $derived(formatTime(currentTime[0]));
	let duration = $state(0);
	let durationFormatted = $derived(formatTime(duration));
	let paused = $state(true);
	let volume = $state(1);
	let volumeSlider = $derived([volume]);
	let volumeLast;
	let volumeHover = $state(false);
	let isFullscreen = $state(false);
	let showOverlay = $state(true);
	let overlayTimeout;

	onMount(() => {
		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(data.video.src);
			hls.attachMedia(stream);
			hls.on(Hls.Events.MEDIA_ATTACHED, () => {
				console.log('Media attached');
			});
		}
	});

	$effect(() => {
		if (paused) {
			stream.pause();
		} else {
			stream.play();
		}
	});

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

	function overlay() {
		showOverlay = true;
		if (overlayTimeout) {
			clearTimeout(overlayTimeout);
		}
		overlayTimeout = setTimeout(() => {
			if (!paused) {
				showOverlay = false;
			}
		}, 3000);
	}
</script>

<div
	bind:this={streamContainer}
	onmousemove={overlay}
	role="region"
	aria-label="Video player container"
>
	{#if showOverlay}
		<div
			transition:fly={{ y: -100, duration: 200 }}
			class="fixed top-0 left-0 w-full p-4 z-50 flex items-center bg-gradient-to-b from-black to-transparent space-x-4"
		>
			<button onclick={() => history.back()} aria-label="Go back" class="text-white">
				<ArrowLeft class="h-6 w-6" />
			</button>
			<h1>{data.video.title}</h1>
		</div>
	{/if}
	<video
		id="stream"
		bind:this={stream}
		onclick={() => (paused = !paused)}
		ontimeupdate={(e) => (currentTime[0] = e.target.currentTime)}
		ondurationchange={(e) => (duration = e.target.duration)}
		onplay={() => (paused = false)}
		onpause={() => (paused = true)}
		bind:volume
		class="w-screen h-screen bg-black"
	></video>
	{#if showOverlay}
		<div
			transition:fly={{ y: 100, duration: 200 }}
			class="fixed bottom-0 left-0 w-full p-4 z-50 bg-gradient-to-t from-black to-transparent space-y-2"
		>
			<div class="flex items-center space-x-4">
				<span>{currentTimeFormatted}</span>
				<Slider
					class="w-full"
					bind:value={currentTime}
					max={duration}
					thumbSize="p-1.5"
					onValueChange={(e) => {
						stream.currentTime = e.value[0];
						currentTime[0] = e.value[0];
					}}
				/>
				<span>{durationFormatted}</span>
			</div>
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<button onclick={() => (paused = !paused)}>
						{#if paused}
							<IconPlay class="h-6 w-6" />
						{:else}
							<IconPause class="h-6 w-6" />
						{/if}
					</button>
					<div
						class="flex items-center"
						role="group"
						onmouseenter={() => (volumeHover = true)}
						onmouseleave={() => (volumeHover = false)}
					>
						<button
							onclick={() => {
								if (volume !== 0) {
									volumeLast = volume;
								}
								volume = volume === 0 ? volumeLast : 0;
							}}
						>
							{#if volume === 0}
								<VolumeOff class="h-6 w-6" />
							{:else if volume < 0.5}
								<Volume1 class="h-6 w-6" />
							{:else}
								<Volume2 class="h-6 w-6" />
							{/if}
						</button>
						{#if volumeHover}
							<div transition:slide={{ axis: 'x', duration: 100 }} class="w-24 ml-2">
								<Slider
									class="w-full"
									bind:value={volumeSlider}
									min={0}
									max={1}
									step={0.01}
									thumbSize=""
									onValueChange={(e) => {
										volume = e.value[0];
									}}
								/>
							</div>
						{/if}
					</div>
				</div>
				<button
					onclick={() => {
						if (isFullscreen) {
							isFullscreen = false;
							document.exitFullscreen();
						} else {
							isFullscreen = true;
							streamContainer.requestFullscreen();
						}
					}}
				>
					{#if isFullscreen}
						<Minimize class="h-6 w-6" />
					{:else}
						<Maximize class="h-6 w-6" />
					{/if}
				</button>
			</div>
		</div>
	{/if}
</div>
