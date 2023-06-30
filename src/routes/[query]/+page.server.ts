import { getTatan } from '$lib/services/tatan.service';
export const load = async (event) => {
	const { params, url, setHeaders } = event;
	const { query } = params;
	const urlSearchParam = url.searchParams.get('page');
	const lang = url.searchParams.get('lang') ?? 'zh';
	const pageNum = urlSearchParam ? +urlSearchParam : 1;
	const tatan = getTatan(lang, query, pageNum, setHeaders);
	return {
		lazy: {
			tatan
		},
		totalResults: (await tatan).queries.request[0].totalResults
	};
};
