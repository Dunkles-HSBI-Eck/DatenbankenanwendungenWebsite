import { getObject } from '$lib/server/objectStorage.js';

export async function GET({ params }) {
	const { videoId, resolution, segment } = params;

	const stream = await getObject('videos', `${videoId}/${resolution}/${segment}`);

	return new Response(stream, {
		headers: {
			'Content-Type': 'application/octet-stream'
		}
	});
}
