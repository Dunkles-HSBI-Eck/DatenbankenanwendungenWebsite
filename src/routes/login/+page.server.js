import { redirect } from '@sveltejs/kit';

export async function load({locals}) {
    if (locals.userId !== undefined) {
        redirect(303,"/")
    }
}