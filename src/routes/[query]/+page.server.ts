import type { PageServerLoad } from './$types';
import { API_PRIVATE_KEY, SEARCH_ENGINE_ID } from '$env/static/private';
import type { TatanSearchResponse } from '../types/Tatan';
export const load: PageServerLoad = async ({
	params,
	setHeaders
}): Promise<TatanSearchResponse> => {
	const { query } = params;

	const response = await fetch(
		`https://customsearch.googleapis.com/customsearch/v1?key=${API_PRIVATE_KEY}&cx=${SEARCH_ENGINE_ID}&q=tatan${query}&gl=cn&hl=zh-CN&lr=lang_zh-TW|lang_zh-CN&c2coff=0&fileType=gif&searchType=image&imgType=animated&alt=json&safe=active&filter=1`
	);

	setHeaders({
		// '1 hour'
		'Cache-Control': 'max-age=3600',
		age: response.headers.get('age') || '0'
	});

	const tatan = await response.json();

	return {
		tatan: tatan
	};
};
