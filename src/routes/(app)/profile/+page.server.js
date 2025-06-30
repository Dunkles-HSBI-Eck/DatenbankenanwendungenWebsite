import { redirect } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
	if (locals.userId === undefined) {
		redirect(303, '/login');
	}

	return {
		userId: locals.userId,
		userTier: await getTier(fetch),
		userMail: await getMail(fetch)
	};
}

async function getTier(fetch) {
	const response = await fetch(`/api/v1/user/tier`);
	const data = await response.json();
	return data.name;
}

async function getMail(fetch) {
	const response = await fetch(`/api/v1/user/email`);
	const data = await response.json();
	return data.email;
}
