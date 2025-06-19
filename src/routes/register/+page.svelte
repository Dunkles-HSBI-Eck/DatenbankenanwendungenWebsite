<script>
	import { goto } from '$app/navigation';
	import { House } from '@lucide/svelte';
	import { json } from '@sveltejs/kit';
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';

	let email = $state();
	let password = $state();
	let confirmPassword = $state();
	let registerFaliureMessage = $state("");
	let buttonEnabled = $state(true);

	async function register() {
		buttonEnabled = false;
		if (password !== confirmPassword) {
			registerFaliureMessage = "Passwords do not match!";
			buttonEnabled=true;
			return;
		}
		const respond = await fetch('/api/v1/register', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		});

		if (respond.ok) {
			goto('/');
		}

		if (!respond.ok) {
			console.log('registration failed');

			registerFaliureMessage = "registration failed."
		}
		buttonEnabled = true;
	}
</script>

<main class="bg-surface-950 relative flex min-h-screen items-center justify-center">
	<a href="/" class="text-secondary-400 absolute top-6 left-6 flex items-center gap-2">
		<House class="hover:bg-surface-800 h-7 w-7 rounded p-1" />
	</a>
	<form
		class="bg-surface-900 border-surface-800 flex w-full max-w-md flex-col gap-6 rounded-2xl border p-10 shadow-2xl backdrop-blur-md"
		on:submit|preventDefault={register}
	>
		<h2 class="text-secondary-400 mb-4 text-center text-3xl font-extrabold drop-shadow">
			Register
		</h2>
		<label class="flex flex-col gap-2 rounded-xl p-2">
			<span class="text-secondary-400 font-medium">E-mail</span>
			<input
				bind:value={email}
				class="input input-bordered input-lg text-secondary-400 bg-surface-800 border-surface-700 focus:ring-primary-400 w-full rounded-lg border focus:outline-none"
				type="email"
				placeholder="E-mail"
				required
			/>
		</label>
		<label class="flex flex-col gap-2 rounded-xl p-2">
			<span class="text-secondary-400 font-medium">Password</span>
			<input
				bind:value={password}
				type="password"
				placeholder="Password"
				class="input input-bordered input-lg text-secondary-400 bg-surface-800 border-surface-700 focus:ring-primary-400 w-full rounded-lg border focus:outline-none"
				required
			/>
		</label>
		<label class="flex flex-col gap-2 rounded-xl p-2">
			<span class="text-secondary-400 font-medium">Confirm Password</span>
			<input
				bind:value={confirmPassword}
				type="password"
				placeholder="Confirm Password"
				class="input input-bordered input-lg text-secondary-400 bg-surface-800 border-surface-700 focus:ring-primary-400 w-full rounded-lg border focus:outline-none"
				required
			/>
		</label>

		<p class="text-primary-500">{registerFaliureMessage}</p>
		{#if buttonEnabled}
			<button
			type="submit"
			class="btn btn-lg btn-block text-secondary-400 bg-primary-500 focus:ring-secondary-300 rounded-xl shadow-md focus:ring-2"
		>
			Register
		</button>
		{:else}
			<button
			class="btn btn-lg btn-block text-secondary-400 bg-primary-900 rounded-xl shadow-md "
		>
			Register <ProgressRing value={null} size="size-5" meterStroke="stroke-secondary-600-400" trackStroke="stroke-primary-50-950" />
		</button>
		{/if}
		


		<div class="text-primary-400 mt-2 text-center">
			<a href="/login" class="hover:text-primary-200 transition-colors duration-150 hover:underline"
				>Already have an account? Login</a
			>
		</div>
	</form>
</main>
