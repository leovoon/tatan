import type { Tatan } from '$lib/types/Tatan';
import { API_PRIVATE_KEY, SEARCH_ENGINE_ID } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const getTatan = async (
	lang: string,
	query: string,
	page = 1,
	setHeaders: (headers: Record<string, string>) => void
) => {
	if (page <= 0 || page > 91) page = 1;

	let langParam;

	if (lang === 'zh') langParam = `q=tatan${query}&gl=cn&hl=zh-CN&lr=lang_zh-TW|lang_zh-CN`;
	if (lang === 'en') langParam = `q=tatan${query}&gl=id&lr=lang_ms|lang_id`;

	const response = await fetch(
		`https://customsearch.googleapis.com/customsearch/v1?fields=queries/request(totalResults),items(link,displayLink,image)&key=${API_PRIVATE_KEY}&cx=${SEARCH_ENGINE_ID}&${langParam}&c2coff=0&fileType=gif&searchType=image&imgType=animated&alt=json&safe=active&filter=1&start=${page}`,
		{
			mode: 'cors',
			headers: {
				'accept-enconding': 'gzip'
			}
		}
	);
	if (response.status === 429) {
		throw error(429, {
			message: 'Requests hit limit, come back tomorrow.'
		});
	}

	if (!response.ok)
		throw error(404, {
			message: 'Something went wrong. Contact the developer.'
		});

	setHeaders({
		// '1 hour'
		'Cache-Control': 'max-age=3600',
		age: response.headers.get('age') || '0'
	});

	const tatanData = await response.json();

	return tatanData as Tatan;
};
