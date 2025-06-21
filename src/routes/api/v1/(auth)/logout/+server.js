export async function GET() {
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/',
			'Set-Cookie': 'jwt=; HttpOnly; Path=/; Max-Age=0; Secure;'
		}
	});
}
