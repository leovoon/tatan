import type { PageServerLoad } from './$types';
import { getTatan } from '$lib/services/tatan.service';
export const load: PageServerLoad = async ({ params, url, setHeaders }) => {
	const { query } = params;
	const urlSearchParam = url.searchParams.get('page');
	const pageNum = urlSearchParam ? +urlSearchParam : 1;

	const tatan = getTatan(query, pageNum, setHeaders);
	return {
		lazy: {
			tatan
		},
		totalResults: (await tatan).queries.request[0].totalResults
	};
};
