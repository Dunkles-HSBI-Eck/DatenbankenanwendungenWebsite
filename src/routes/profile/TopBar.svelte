<script>
	import LogoBtn from "../LogoBtn.svelte";
    import {goto} from "$app/navigation"
    let { profilePic } = $props();
</script>

<div class = " fixed z-40 top-0 justify-between bg-surface-900 h-20 w-full border border-surface-800 rounded shadow flex items-center">
    <LogoBtn href="/"/>
    <div class=" items-center">

    
    <div class="flex items-center h-20">
        <button href="/profile" class="mr-6 rounded-full focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Go to profile">
            <img src={profilePic} alt="Profile" class="w-14 h-14 rounded-full border-2 border-secondary-400 object-cover shadow-md hover:scale-105 transition-transform duration-200 bg-surface/80 backdrop-blur-md" />
        </button>
    </div>
    </div>
</div>