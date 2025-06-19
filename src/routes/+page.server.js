import { redirect } from '@sveltejs/kit';

export async function load({locals}) {
    if (locals.userId) {
        redirect(303,"/browse")
    }
}