import { API_PRIVATE_KEY, SEARCH_ENGINE_ID } from '$env/static/private';

export const getTatan = async (query: string, page = 1) => {
	const unsecuredSite = `fabiaoqing.com pic.sogou.com www.sohu.com www.bqtu.com m.gaoxiaogif.com www.52fzs.com www.msflocking.com m.soogif.com`;
	const response = await fetch(
		`https://customsearch.googleapis.com/customsearch/v1?fields=kind,items(link,displayLink,image)&key=${API_PRIVATE_KEY}&cx=${SEARCH_ENGINE_ID}&q=tatan${query}&gl=cn&hl=zh-CN&lr=lang_zh-TW|lang_zh-CN&c2coff=0&fileType=gif&searchType=image&imgType=animated&alt=json&safe=active&filter=1&start=${page}&siteSearch=${unsecuredSite}&siteSearchFilter=e`,
		{
			mode: 'cors',
			headers: {
				'accept-enconding': 'gzip'
			}
		}
	);

	return response;
};