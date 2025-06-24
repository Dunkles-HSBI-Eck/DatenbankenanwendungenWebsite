<script>
	import Borrowed from './Borrowed.svelte';
	import Reserved from './Reserved.svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { userId } from '$lib/store.js';
	import { goto } from '$app/navigation';


	let { profilePic, data } = $props();
	let BorrowedTableData = $state([]);

	let ReservedTableData = $state([]);

	let maxLeihverträge = 5;
	let userEmail = $derived(data.userMail);
	let userTier = $derived(data.userTier);

	onMount(async () => {
        const response = await fetch('/api/v1/borrowedMovies');
        const data = await response.json();
        BorrowedTableData = data.movies.map((movie) => ({
            id: movie.id,
            titel: movie.name,
            startDate: movie.rentalDate,
            timeLeft: movie.timeLeft
        }));

        const response2 = await fetch('/api/v1/reservations');
        const data2 = await response2.json();

        ReservedTableData = data2.reservations.map((reservation) => ({
            id: reservation.id,
            titel: reservation.title,
            status: reservation.status
        }));

        console.log(data2);
    });

	async function logout() {
		const response = await fetch('/api/v1/logout');
		if (response.ok) {
			userId.set(null);
			goto('/');
		}
	}
</script>

<div class="relative flex w-full flex-col items-center gap-6">
	<div class="flex w-full max-w-4xl flex-col justify-center gap-6 md:flex-row">
		<div class="card bg-surface-950 border-surface-200-800 mb-2 flex-1 border-[1px] p-6">
			<div class="text-primary-400 mb-2 text-lg font-bold">Profil</div>
			<div class="text-secondary-400 mb-1">
				<span class="font-semibold">E-Mail:</span>
				{userEmail}
			</div>
			<span class="text-secondary-400 font-semibold">Current Plan:</span>
			<span class="text-tertiary-500">{userTier}</span>
			<div class="mt-4 flex flex-col gap-2">
				<a class="btn bg-primary-500 text-secondary-400 self-start" href="/payment">
					Add Payment Option
				</a>
				<a class="btn bg-primary-500 text-secondary-400 self-start" href="/subscriptions">
					Change plan
				</a>
				<button onclick={logout} class="btn bg-primary-500 text-secondary-400 self-start">
					Logout
				</button>
			</div>
		</div>
		<div class="card bg-surface-950 border-surface-200-800 mb-2 flex-1 border-[1px] p-6">
			<form class="mb-2 flex w-full flex-col gap-2" style="max-width: 320px;">
				<label class="text-secondary-400 text-sm font-semibold" for="current-password"
					>Current Password</label
				>
				<input
					id="current-password"
					type="password"
					class="input input-sm bg-surface-800 border-surface-700 rounded border px-2 py-1"
					autocomplete="current-password"
				/>
				<label class="text-secondary-400 text-sm font-semibold" for="new-password"
					>New Password</label
				>
				<input
					id="new-password"
					type="password"
					class="input input-sm bg-surface-800 border-surface-700 rounded border px-2 py-1"
					autocomplete="new-password"
				/>
				<label class="text-secondary-400 text-sm font-semibold" for="confirm-password"
					>Confirm New Password</label
				>
				<input
					id="confirm-password"
					type="password"
					class="input input-sm bg-surface-800 border-surface-700 rounded border px-2 py-1"
					autocomplete="new-password"
				/>
				<button type="button" class="btn btn-xs bg-primary-500 text-secondary-400 mt-2 self-end"
					>Change Password</button
				>
			</form>
		</div>
	</div>
	<div class="flex w-full max-w-4xl flex-col justify-center gap-6 md:flex-row">
		<div class="card bg-surface-950 border-surface-200-800 flex-1 border-[1px] p-8">
			<Borrowed tableData={BorrowedTableData} {maxLeihverträge} />
		</div>
		<div class="card bg-surface-950 border-surface-200-800 flex-1 border-[1px] p-8">
			<Reserved tableData={ReservedTableData} />
		</div>
	</div>
</div>
