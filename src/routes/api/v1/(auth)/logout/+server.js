export async function GET() {
	return new Response(null, {
		headers: {
			'Set-Cookie': 'jwt=; HttpOnly; Path=/; Max-Age=0; Secure;'
		}
	});
}
