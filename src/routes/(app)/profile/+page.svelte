<script>
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import Borrowed from './Borrowed.svelte';
	import Reserved from './Reserved.svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { userId } from '$lib/store.js';
	import { goto } from '$app/navigation';
	import WishMovie from './WishMovie.svelte';

	let { profilePic, data } = $props();
	let BorrowedTableData = $state([]);

	let ReservedTableData = $state([]);

	let maxLeihverträge = 5;
	let userEmail = $derived(data.userMail);
	let userTier = $derived(data.userTier);
	let logoutLoading= $state(false);
	

	onMount(async () => {
		const response = await fetch('/api/v1/user/rented');
		const data = await response.json();
		BorrowedTableData = data.map((movie) => ({
			id: movie.id,
			titel: movie.name,
			startDate: movie.rentalDate,
			timeLeft: movie.timeLeft
		}));

		const response2 = await fetch('/api/v1/user/reservations');
		const data2 = await response2.json();

		ReservedTableData = data2.map((reservation) => ({
			id: reservation.id,
			titel: reservation.title,
			status: reservation.status
		}));
	});

	async function logout() {
		logoutLoading = true;
		const response = await fetch('/api/v1/logout');
		if (response.ok) {
			userId.set(null);
			goto('/');
		}
		logoutLoading = false;
	}
</script>

<div class="relative flex w-full flex-col items-center gap-6">
	<div class="flex w-full max-w-4xl flex-col justify-center gap-6 md:flex-row">
		<div class="card bg-surface-950 border-surface-200-800 mb-2 flex-1 border-[1px] p-6">
			<div class="text-primary-400 mb-2 text-lg font-bold">Profile</div>
			<div class="text-secondary-400 mb-1">
				<span class="font-semibold">E-Mail:</span>
				{userEmail}
			</div>
			<span class="text-secondary-400 font-semibold">Current Plan:</span>
			<span class="text-tertiary-500">{userTier}</span>
			<div class="mt-4 flex flex-col gap-2">
				<a class="btn bg-primary-500 text-secondary-400 self-start" href="/subscriptions">
					Change plan
				</a>
				{#if !logoutLoading}
				<button onclick={logout} class="btn bg-primary-500 text-secondary-400 self-start">
					Logout
				</button>
				{:else}
				<div class="btn bg-primary-900 text-secondary-400 self-start">
					Logout
					<ProgressRing
					value={null}
					size="size-5"
					meterStroke="stroke-secondary-600-400"
					trackStroke="stroke-primary-50-950"
				/>
				</div>
				
				{/if}
			</div>
		</div>
		<div class="card bg-surface-950 border-surface-200-800 mb-2 flex-1 border-[1px] p-6">
			<WishMovie />
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
