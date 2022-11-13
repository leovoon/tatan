import type { PageServerLoad } from './$types';
import type { TatanSearchResponse } from '$lib/types/Tatan';
import { getTatan } from '$lib/modules/tatan.service';
export const load: PageServerLoad = async ({
	params,
	setHeaders
}): Promise<TatanSearchResponse> => {
	const { query } = params;

	const response = await getTatan(query);

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
