import type { LayoutServerLoad } from './$types';
import type { TatanSearchResponse } from '$lib/types/Tatan';
import { getTatan } from '$lib/modules/tatan.service';
import { error } from '@sveltejs/kit';
export const load: LayoutServerLoad = async ({
	params,
	url,
	setHeaders
}): Promise<TatanSearchResponse> => {
	const { query } = params;
	const urlSearchParam = url.searchParams.get('page');
	const pageNum = urlSearchParam ? +urlSearchParam : 1;

	const response = await getTatan(query, pageNum);

	if (!response.ok) {
		throw error(404, {
			message: '获取资源时报错了，请稍后再试，或者联系管理员。'
		});
	}

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
