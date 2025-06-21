<script>
	import { Search, User } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { userId } from './store';

	let searchBarValue = $state('');
	let userIdValue = $state();

	userId.subscribe((value) => {
		userIdValue = value;
	});
</script>

<nav class="text-secondary-400 fixed top-0 left-0 z-40 w-full p-4">
	<div class="bg-surface-900 flex items-center justify-between gap-2 rounded-lg p-2">
		<div class="w-[12.5rem]">
			<a href="/" class="h-12 w-12 rounded-lg">
				<img src="/logo_cropped.png" alt="Logo" class="bg-secondary-500 h-12 w-12 rounded-lg p-1" />
			</a>
		</div>
		<div class="border-secondary-500 flex w-full max-w-1/2 gap-2 rounded-lg border-2">
			<input
				onkeydown={(e) => (e.key === 'Enter' ? goto(`/browse?search=${searchBarValue}`) : '')}
				bind:value={searchBarValue}
				type="text"
				placeholder="Suche..."
				class="text-secondary-400 h-10 w-full pl-2 outline-none"
			/>
			<a href="/browse?search={searchBarValue}" class="rounded-lg">
				<Search class="text-secondary-400 h-10 w-10 px-2" />
			</a>
		</div>
		<div class="flex w-[12.5rem] justify-end gap-1">
			{#if userIdValue}
				<a href="/profile">
					<User
						class="text-secondary-400 hover:bg-secondary-500 hover:text-surface-900 h-12 w-12 rounded-lg"
					/>
				</a>
			{:else}
				<a
					href="/register"
					class="btn btn-lg hover:ring-secondary-300 h-12 w-24 rounded-lg hover:scale-105"
					>Register</a
				>
				<a href="/login" class="btn btn-lg bg-primary-500 h-12 w-24 rounded-lg hover:scale-105"
					>Login</a
				>
			{/if}
		</div>
	</div>
</nav>
