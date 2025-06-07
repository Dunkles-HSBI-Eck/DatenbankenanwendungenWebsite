<script>
    import { Slider } from '@skeletonlabs/skeleton-svelte';

    import { Play as IconPlay } from '@lucide/svelte';
    import { Pause as IconPause } from '@lucide/svelte';
    import { ArrowLeftFromLine as IconBack } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';



    let videoSrc= $state("TestVid.mp4");
    let barPercentage = $state(0);
    let paused = $state(true);
    let stream;
    let streamDuration = $state(0);
    let streamCurrentTime = $state(0);
    

    
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

    function updateTime(){
        streamCurrentTime = stream.currentTime;
    }
    onMount(() => {
        stream = document.getElementById("stream");
        streamDuration = stream.duration;
        setInterval(updateTime, 500);
        
    })

    function handleSliderChange(value) {
    console.log("before:" + value.value);
    if (stream && stream.duration) {
        stream.currentTime = (value.value / 100) * stream.duration;
    }
    console.log("changed");
    }
    

</script>
<video id="stream">
    <source src={videoSrc} type="video/mp4">

</video>
<div class="fixed bottom-0 p-1 w-full h-32  duration-300 hover:opacity-100 transition-opacity hover:pointer-events-auto" >
    
      <div class="p-10">  
    <Slider name="stream" id="progressBar" bind:value={barPercentage} onValueChangeEnd={handleSliderChange} meterBg="bg-secondary-500"  thumbSize="size-4"  thumbClasses="duration-200 opacity-0 hover:opacity-100"/>
        </div>
    <button class="btn preset-filled-tritiary-500 ml-10" onclick={pauseClick}>{#if paused}<IconPlay/>{:else} <IconPause/>{/if} </button>

    <span>
        {new Date(streamCurrentTime * 1000).toISOString().slice(11, 19)}
        {new Date(streamDuration * 1000).toISOString().slice(11, 19)}
    </span>
    
    <button class="btn preset-filled-tritiary-500 ml-10 right-0"><IconBack height=10/></button>


</div>