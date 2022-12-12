import type { RequestHandler } from '@sveltejs/kit';
import { TATAN_PROXY_URL } from '$env/static/private';
import { dev } from '$app/environment';

export const GET: RequestHandler = async ({ fetch, url }) => {
	const proxy_url = dev ? 'http://localhost:3000/api' : TATAN_PROXY_URL;
	const imgUrl = url.searchParams.get('url');
	const response = await fetch(`${proxy_url}?url=${imgUrl}`, {
		headers: {
			'Cache-Control': 'max-age=604800'
		}
	});
	return response;
};
