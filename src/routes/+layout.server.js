// Expose userId from locals to the client for all pages
export async function load({ locals }) {
    return {
        userId: locals.userId ?? null
    };
}
