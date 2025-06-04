export async function hashPassword(password, salt = null) {
    if (!salt) {
        salt = crypto.getRandomValues(new Uint8Array(16)).toString('hex');
    }

    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
    const hash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    return { hash, salt };
}