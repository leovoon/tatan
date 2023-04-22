import type { Tatan } from '$lib/types/Tatan';
import { API_PRIVATE_KEY, SEARCH_ENGINE_ID } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const getTatan = async (
	query: string,
	page = 1,
	setHeaders: (headers: Record<string, string>) => void
) => {
	if (page <= 0 || page > 91) page = 1;

	
	const response = await fetch(
		`https://customsearch.googleapis.com/customsearch/v1?fields=queries/request(totalResults),items(link,displayLink,image)&key=${API_PRIVATE_KEY}&cx=${SEARCH_ENGINE_ID}&q=tatan${query}&gl=cn&hl=zh-CN&lr=lang_zh-TW|lang_zh-CN&c2coff=0&fileType=gif&searchType=image&imgType=animated&imgSize=small&alt=json&safe=active&filter=1&start=${page}`,
		{
			mode: 'cors',
			headers: {
				'accept-enconding': 'gzip'
			}
		}
	);
	if (response.status === 429) {
		throw error(429, {
			message: '请求过于频繁，请明天再来。'
		});
	}

	if (!response.ok)
		throw error(404, {
			message: '获取资源时报错了，请稍后再试，或者联系管理员。'
		});

	setHeaders({
		// '1 hour'
		'Cache-Control': 'max-age=3600',
		age: response.headers.get('age') || '0'
	});

	const tatanData = await response.json();

	return tatanData as Tatan;
};
