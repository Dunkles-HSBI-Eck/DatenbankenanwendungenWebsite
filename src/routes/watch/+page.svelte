<script>
    import { Slider } from '@skeletonlabs/skeleton-svelte';

    import { Play as IconPlay } from '@lucide/svelte';
    import { Pause as IconPause } from '@lucide/svelte';
    import { ArrowLeftFromLine as IconBack } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

    import Hls from 'hls.js';




    let videoSrc= "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
    let barPercentage = $state(0);
    let paused = $state(true);
    let stream;
    let streamDuration = $state(0);
    let streamCurrentTime = $state(0);
    
    if(Hls.isSupported())
    {
        console.log('Hls is supported')
    }
    else
    {
        console.log("Hls is not supported");
    }
    
    
    function pauseClick(){
        paused = !paused;
        if(paused){
            stream.pause();
        }
        else{
            stream.play();
            stream = document.getElementById("stream");
            streamDuration = stream.duration;
        }

    }

    function updateTime(s){
        streamCurrentTime = s.currentTime;
        if(streamDuration != 0)
        {
            barPercentage = [(streamCurrentTime/streamDuration) *1000];
        }
        
        
    }
    onMount(() => {
        streamDuration = stream.duration;
        setInterval(updateTime, 500, stream);
        
        if(Hls.isSupported()){
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(stream);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            console.log('Media attached');
        });
    }

    })

    function handleSliderChange(value) {
    console.log("before:" + value.value[0]);
    if (stream && stream.duration) {
        stream.currentTime = (value.value[0] / 1000) * stream.duration;
    }
    barPercentage = [value.value[0]];
    console.log("changed");
    }
    

</script>
<div class="w-full h-screen">
<video id="stream" bind:this={stream} class="w-full h-full object-contain object-center">
    <source src={videoSrc}>

</video>
</div>
<div class="fixed bottom-0 p-1 w-full h-32 bg-primary-500 duration-300 opacity-0 hover:opacity-100 transition-opacity hover:pointer-events-auto" >
    
      <div class="p-10">  
    <Slider name="stream" id="progressBar" bind:value={barPercentage} disabled={false} readOnly={false} onValueChange={handleSliderChange} max={1000} meterBg="bg-secondary-500"  thumbSize="size-4"  thumbClasses="duration-200 opacity-0 hover:opacity-100"/>
        </div>
    <button class="btn preset-filled-tritiary-500 ml-10" onclick={pauseClick}>{#if paused}<IconPlay/>{:else} <IconPause/>{/if} </button>

    <span>
        {new Date(streamCurrentTime * 1000).toISOString().slice(11, 19)}
        {new Date(streamDuration * 1000).toISOString().slice(11, 19)}
    </span>
    
    <button class="btn preset-filled-tritiary-500 ml-10 right-0"><IconBack height=10/></button>


</div>