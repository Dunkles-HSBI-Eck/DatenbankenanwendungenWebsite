import { getObject } from '$lib/server/objectStorage.js';

export async function GET({ params }) {
	const { videoId } = params;

	const stream = await getObject('videos', `${videoId}/master.m3u8`);

	return new Response(stream, {
		headers: {
			'Content-Type': 'application/octet-stream'
		}
	});
}
