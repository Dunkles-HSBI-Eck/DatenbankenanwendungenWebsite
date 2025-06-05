<script>
    import { Slider } from '@skeletonlabs/skeleton-svelte';

    import { Play as IconPlay } from '@lucide/svelte';
    import { Pause as IconPause } from '@lucide/svelte';
    import { ArrowLeftFromLine as IconBack } from '@lucide/svelte';
    let barPercentage = $state([0])
    let paused = $state(false)

    function pauseClick(){
        paused = !paused
    }

</script>

<div class="fixed bottom-0 p-1 w-full h-32 opacity-0 duration-300 hover:opacity-100" >
    
      <div class="p-10">  
    <Slider name="example" {barPercentage} onValueChange={(e) => (value = e.value)} meterBg="bg-secondary-500"  thumbSize="size-4"  thumbClasses="duration-200 opacity-0 hover:opacity-100"/>
        </div>
    <button class="btn preset-filled-tritiary-500 ml-10" onclick={pauseClick}>{#if paused}<IconPause/>{:else} <IconPlay/>{/if} </button>
    <button class="btn preset-filled-tritiary-500 ml-10 right-0"><IconBack height=10/></button>


</div>