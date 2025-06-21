<script>
	import { Slider } from '@skeletonlabs/skeleton-svelte';

	import { onMount } from 'svelte';
	import { Play, Pause, SlidersHorizontal, ChevronRight, ChevronLeft, Check } from '@lucide/svelte';
	import { VolumeOff, Volume1, Volume2 } from '@lucide/svelte';
	import { Maximize, Minimize } from '@lucide/svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import { Settings } from '@lucide/svelte';
    import { lastMovie } from '$lib/store';
    import { get } from 'svelte/store';
    import { goto } from '$app/navigation';
	import { fly, slide, blur } from 'svelte/transition';

	import Hls from 'hls.js';

    let movie = get(lastMovie)
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
	let showSettings = $state(false);
	let hls;
	let currentSettingPage = $state('menu');
	let currentLevel = $state(-1);
	let settingContainer = $state();
	let settingContainerHeight = $state(0);

	onMount(() => {
		if(!movie) {
			goto('/browse');
			return;
		}
		if (Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(`/api/v1/streams/${movie.video}/master.m3u8`);
			hls.attachMedia(stream);
			hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
				if (hls.autoLevelEnabled) return;
				currentLevel = data.level;
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
				showSettings = false;
			}
		}, 3000);
	}

	function getQualityText() {
		if (hls.autoLevelEnabled) return 'Automatisch';
		return hls.levels[hls.nextLoadLevel].height + 'p';
	}

	function getAllQualities() {
		const levels = hls.levels
			.map((level, index) => ({
				quality: level.height,
				level: index,
				text: `${level.height}p`
			}))
			.sort((a, b) => b.quality - a.quality);

		levels.push({
			quality: 'auto',
			level: -1,
			text: 'Automatisch'
		});

		return levels;
	}
</script>

<div
	bind:this={streamContainer}
	onmousemove={overlay}
	onclick={(event) => {
		if (!settingContainer?.contains(event.target) && showSettings) {
			showSettings = false;
            currentSettingPage = 'menu';
            settingContainerHeight = 0;
		}
	}}
	role="region"
	aria-label="Video player container"
	class="text-secondary-500"
>
	{#if showOverlay}
		<div
			transition:fly={{ y: -100, duration: 200 }}
			class="fixed top-0 left-0 z-50 flex w-full items-center space-x-4 bg-gradient-to-b from-black to-transparent p-4"
		>
			<a href="/movie/{movie.id}" aria-label="Go back">
				<ArrowLeft class="h-6 w-6" />
			</a>
			<h1>{movie?.title}</h1>
		</div>
	{/if}
	<video
		id="stream"
		bind:this={stream}
		onclick={() => {
			if (showSettings) return;
			paused = !paused;
		}}
		ontimeupdate={(e) => (currentTime[0] = e.target.currentTime)}
		ondurationchange={(e) => (duration = e.target.duration)}
		onplay={() => (paused = false)}
		onpause={() => (paused = true)}
		bind:volume
		class="h-screen w-screen bg-black"
	></video>
	{#if showOverlay}
		<div
			transition:fly={{ y: 100, duration: 200 }}
			role="group"
			onmouseleave={() => (volumeHover = false)}
			class="fixed bottom-0 left-0 z-50 w-full space-y-2 bg-gradient-to-t from-black to-transparent p-4"
		>
			<div class="flex items-center space-x-4">
				<span>{currentTimeFormatted}</span>
				<Slider
					class="w-full"
					bind:value={currentTime}
					max={duration}
					thumbSize="p-1.5"
					meterBg="bg-primary-500"
					thumbRingColor="text-secondary-500"
					meter
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
							<Play class="h-6 w-6" />
						{:else}
							<Pause class="h-6 w-6" />
						{/if}
					</button>
					<div class="flex items-center" role="group" onmouseenter={() => (volumeHover = true)}>
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
							<div transition:slide={{ axis: 'x', duration: 100 }} class="ml-2 w-24">
								<Slider
									class="w-full"
									bind:value={volumeSlider}
									min={0}
									max={1}
									step={0.01}
									meterBg="bg-primary-500"
									thumbSize=""
									onValueChange={(e) => {
										volume = e.value[0];
									}}
								/>
							</div>
						{/if}
					</div>
				</div>
				<div class="flex items-center space-x-4">
					<div bind:this={settingContainer} class="relative flex items-center">
						<button onclick={() => (showSettings = !showSettings)} aria-label="Settings">
							<Settings class="h-6 w-6" />
						</button>
						{#if showSettings}
							<div
								transition:blur={{ duration: 200 }}
								style="height: {settingContainerHeight + 32}px"
								class="absolute bottom-16 -right-10 bg-surface-950/90 p-4 rounded shadow-lg z-50 transition-all w-80 duration-400 overflow-hidden"
							>
								{#if currentSettingPage === 'quality'}
									<div
										bind:offsetHeight={settingContainerHeight}
										in:fly={{ x: 200, duration: 200, delay: 100 }}
										out:fly={{ x: 200, duration: 200, delay: 0 }}
									>
										<button
											onclick={() => (currentSettingPage = 'menu')}
											class="flex items-center space-x-2 w-full border-b-[1px] pb-2"
										>
											<ChevronLeft class="h-4 w-4" />
											<p>Qualität</p>
										</button>
										<div>
											{#each getAllQualities() as quality}
												<button
													onclick={() => {
														hls.nextLoadLevel = quality.level;
														hls.loadLevel = quality.level;
														currentLevel = quality.level;
													}}
													class="flex items-center space-x-2 w-full h-8 first:pt-2"
												>
													{#if currentLevel === quality.level}
														<Check class="h-4 w-4" />
													{:else}
														<div class="w-4"></div>
													{/if}
													<p>{quality.text}</p>
												</button>
											{/each}
										</div>
									</div>
								{:else}
									<div
										bind:offsetHeight={settingContainerHeight}
										in:fly={{ x: -200, duration: 200, delay: 200 }}
									>
										<button
											onclick={() => (currentSettingPage = 'quality')}
											class="flex items-center w-full justify-between"
										>
											<div class="flex items-center space-x-2">
												<SlidersHorizontal class="h-6 w-6" />
												<p>Qualität</p>
											</div>
											<div class="flex items-center">
												<p>{getQualityText()}</p>
												<ChevronRight class="h-4 w-4" />
											</div>
										</button>
									</div>
								{/if}
							</div>
						{/if}
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
		</div>
	{/if}
</div>
