<script>
	import { goto } from '$app/navigation';
    import { House } from '@lucide/svelte';
	import { json } from '@sveltejs/kit';

    let email
    let password
    let confirmPassword


    async function register() {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const respond = await fetch("/api/v1/register", {
            method:"POST",
            body:JSON.stringify({
                email,
                password
            })
        })

        if (respond.ok) {
            goto("/")
        }
        
        if (!respond.ok) {
            console.log("registration failed")
        }
    }
</script>

<main class="flex items-center justify-center min-h-screen bg-surface-950 relative">
    <a href="/" class="absolute top-6 left-6 flex items-center gap-2 text-secondary-400">
        <House class="w-7 h-7 p-1 rounded hover:bg-surface-800" />
    </a>
    <form class="p-10 rounded-2xl w-full max-w-md flex flex-col gap-6 shadow-2xl bg-surface-900 border border-surface-800 backdrop-blur-md" on:submit|preventDefault={register}>
        <h2 class="text-3xl font-extrabold text-center mb-4 text-secondary-400 drop-shadow">Register</h2>
        <label class="flex flex-col gap-2 rounded-xl p-2">
            <span class="font-medium text-secondary-400">E-mail</span>
            <input
                bind:value={email}
                class="input input-bordered input-lg w-full text-secondary-400 bg-surface-800 border border-surface-700 focus:ring-primary-400 focus:outline-none rounded-lg"
                type="email"
                placeholder="E-mail"
                required/>
        </label>
        <label class="flex flex-col gap-2 rounded-xl p-2">
            <span class="font-medium text-secondary-400">Password</span>
            <input
                bind:value={password}
                type="password"
                placeholder="Password"
                class="input input-bordered input-lg w-full text-secondary-400 bg-surface-800 border border-surface-700 focus:ring-primary-400 focus:outline-none rounded-lg"
                required/>
        </label>
        <label class="flex flex-col gap-2 rounded-xl p-2">
            <span class="font-medium text-secondary-400">Confirm Password</span>
            <input
                bind:value={confirmPassword}
                type="password"
                placeholder="Confirm Password"
                class="input input-bordered input-lg w-full text-secondary-400 bg-surface-800 border border-surface-700 focus:ring-primary-400 focus:outline-none rounded-lg"
                required/>
        </label>
        <button
            type="submit"
            class="btn btn-lg btn-block text-secondary-400 rounded-xl bg-primary-500 shadow-md focus:ring-2 focus:ring-secondary-300">
            Register
        </button>
        <div class="text-center mt-2 text-primary-400">
            <a href="/login" class="hover:underline hover:text-primary-200 transition-colors duration-150">Already have an account? Login</a>
        </div>
    </form>
</main>