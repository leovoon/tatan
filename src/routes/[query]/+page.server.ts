import type { PageServerLoad } from './$types';
import type { TatanSearchResponse } from '$lib/types/Tatan';
import { getTatan } from '$lib/modules/tatan.service';
export const load: PageServerLoad = async ({
	params,
	url,
	setHeaders
}): Promise<TatanSearchResponse> => {
	const { query } = params;
	const urlSearchParam = url.searchParams.get('page');
	const pageNum = urlSearchParam ? +urlSearchParam : 1;

	const response = await getTatan(query, pageNum);

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
