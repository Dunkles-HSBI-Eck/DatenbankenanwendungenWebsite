<script>
	import { goto } from '$app/navigation';
    import Borrowed from './Borrowed.svelte';
    import Reserved from './Reserved.svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import { onMount } from 'svelte';

    const BorrowedTableData = [
        { titel: 'Test', startDate: '10.05.2025', endDate: '10.06.2025' },
        { titel: 'Film', startDate: '10.05.2025', endDate: '10.06.2025' },
        { titel: 'Grrr', startDate: '10.05.2025', endDate: '10.06.2025' }
    ];

    const ReservedTableData = [
        { titel: 'bdfbd', availible: true },
        { titel: 'asdasd', availible: false }
    ];

    let maxLeihverträge = 5;
    let userEmail = 'user@email.com';
    let subscriptionPlanName = 'free';
    let plans = ['free', 'pro', 'ultra'];
    let planIndex = plans.indexOf(subscriptionPlanName);

    async function logout() {
        const respond = await fetch('/api/v1/logout', {
			method: 'Get'
		});

		if (respond.ok) {
			goto('/login');
		}

		if (!respond.ok) {
			console.log('not found');
		}
    }

	onMount(async () => {
		if (data.userId) {

		} else {
			goto('/login');
		}
	});
</script>

<div class="flex flex-col items-center gap-6 mt-8 relative w-full">
  <button onclick={() => history.back()} aria-label="Go back" class="absolute top-6 left-6 flex items-center gap-2 text-secondary-400 bg-transparent border-none p-0">
    <ArrowLeft class="h-6 w-6 hover:bg-surface-800 rounded p-1" />
  </button>
  <div class="w-full max-w-md card bg-surface-950 border-[1px] border-surface-200-800 p-6 mb-2">
    <div class="mb-2 text-lg font-bold text-primary-400">Profil</div>
    <div class="mb-1 text-secondary-400"><span class="font-semibold">E-Mail:</span> {userEmail}</div>
    <span class="font-semibold text-secondary-400">Current Plan:</span> <span class="text-tertiary-500">{subscriptionPlanName}</span>
    <button class="ml-2 btn btn-xs bg-primary-500 text-secondary-400" type="button" onclick={changePlan}>
      Change plan
    </button>
    <a class="ml-2 btn btn-xs bg-primary-500 text-secondary-400" type="button" href="/subscriptions">
      Add Payment Option
    </a>
    <button class="ml-2 btn btn-xs bg-primary-500 text-secondary-400" type="button" onclick={logout}>
      Logout
    </button>
  </div>
  <div class="w-full max-w-md card bg-surface-950 border-[1px] border-surface-200-800 p-6 mb-2">
    <form class="flex flex-col gap-2 mb-2 w-full" style="max-width: 320px;">
      <label class="text-sm font-semibold text-secondary-400" for="current-password">Current Password</label>
      <input id="current-password" type="password" class="input input-sm bg-surface-800 border border-surface-700 rounded px-2 py-1" autocomplete="current-password" />
      <label class="text-sm font-semibold text-secondary-400" for="new-password">New Password</label>
      <input id="new-password" type="password" class="input input-sm bg-surface-800 border border-surface-700 rounded px-2 py-1" autocomplete="new-password" />
      <label class="text-sm font-semibold text-secondary-400" for="confirm-password">Confirm New Password</label>
      <input id="confirm-password" type="password" class="input input-sm bg-surface-800 border border-surface-700 rounded px-2 py-1" autocomplete="new-password" />
      <button type="button" class="btn btn-xs bg-primary-500 mt-2 self-end text-secondary-400">Change Password</button>
    </form>
  </div>
  <div class='card bg-surface-950 border-[1px] border-surface-200-800 p-8'>
    <Borrowed tableData={BorrowedTableData} maxLeihverträge={maxLeihverträge} />
  </div>
  <div class='card bg-surface-950 border-[1px] border-surface-200-800 p-8'>
    <Reserved tableData={ReservedTableData} />
  </div>
</div>