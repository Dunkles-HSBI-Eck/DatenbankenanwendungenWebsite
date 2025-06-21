<script>
    import { Search, User } from "@lucide/svelte";
    import { goto } from '$app/navigation';
    import { userId } from "./store";

    let searchBarValue = $state("");
    let userIdValue = $state();

    userId.subscribe(value => {
        userIdValue = value;
    });
</script>

<nav class="fixed top-0 left-0 w-full p-4 text-secondary-400 z-40">
    <div class="flex justify-between gap-2 items-center bg-surface-900 rounded-lg p-2">
        <div class="w-[12.5rem]">
            <a href="/" class="h-12 w-12 rounded-lg">
                <img src="/logo_cropped.png" alt="Logo" class="h-12 w-12 rounded-lg bg-secondary-500 p-1">
            </a>
        </div>
        <div class="flex border-2 border-secondary-500 w-full max-w-1/2 gap-2 rounded-lg">
            <input onkeydown={(e) => e.key === "Enter" ? goto(`/browse?search=${searchBarValue}`) : ""} bind:value={searchBarValue} type="text" placeholder="Suche..." class="h-10 pl-2 w-full text-secondary-400 outline-none">
            <a href="/browse?search={searchBarValue}" class="rounded-lg">
                <Search class="px-2 h-10 w-10 text-secondary-400" />
            </a>
        </div>
        <div class="flex justify-end gap-1 w-[12.5rem]">
            {#if userIdValue}
                <a href="/profile">
                    <User class="h-12 w-12 text-secondary-400 rounded-lg hover:bg-secondary-500 hover:text-surface-900" />  
                </a>
            {:else}
                <a
                    href="/register"
                    class="btn btn-lg h-12 w-24 hover:ring-secondary-300 rounded-lg hover:scale-105"
                    >Register</a
                >
                <a
                    href="/login"
                    class="btn btn-lg h-12 w-24 bg-primary-500 rounded-lg hover:scale-105"
                    >Login</a
                >
            {/if}
		</div>
    </div>
</nav>