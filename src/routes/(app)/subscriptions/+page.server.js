import { redirect } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
	if (locals.userId === undefined) {
		redirect(303, '/login');
	}

	const response = await fetch('/api/v1/tiers');
	const data = await response.json();

	const response2 = await fetch('/api/v1/tier');
	const data2 = await response2.json();

	let subscriptions = [];

	// Use the correct property for currentPlanID
	let currentPlanID = data2.tiers?.[0]?.current_tier ?? null;

	subscriptions = data.tiers.map((tier) => ({
		id: tier.id,
		name: tier.name,
		price: tier.price,
		priceReduction: tier.discount
	}));

	return {
		subscriptions: subscriptions,
		currentPlanID: currentPlanID
	};
}
